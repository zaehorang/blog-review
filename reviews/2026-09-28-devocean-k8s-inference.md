---
date: 2026-09-28
company: SK DEVOCEAN (최용호)
source: https://devocean.sk.com/blog/techBoardDetail.do?id=168512&boardType=techBlog&isShared=Y
tags: [infra, platform, 성능, 비용최적화]
raw: ../raw/2026-09-28-devocean-k8s-inference.jsonl
---

# SK DEVOCEAN — 쿠버네티스로 여는 AI 추론 인프라

## 🔑 한 줄 요약
> Kubernetes Service의 상태를 모르는 무작위 분산은 KV 캐시를 죽인다 — 캐시가 있는 곳으로 보내는 상태 인지 라우팅(llm-d)과, 성격이 다른 두 단계(prefill/decode)를 분리해서 독립적으로 확장하는 것이 지금 추론 인프라의 핵심 두 축이다.

## 📌 무슨 글 (중립 요약)
- AI 컴퓨팅의 무게중심이 학습(배치성)에서 추론(상시성)으로 이동했고, 도메인 특화 모델 수요로 기업들이 직접 추론 인프라를 운영해야 하는 상황이 늘고 있다.
- 일반 K8s Service의 랜덤 부하분산은 LLM의 KV 캐시 특성과 안 맞아 캐시 미스를 유발한다 → llm-d 같은 AI 라우터(inference-aware router)로 상태 인지 라우팅이 필요.
- Prefill(연산 바운드)과 Decode(메모리대역폭 바운드)를 물리적으로 분리하면 처리량 2배, 비용 30~40% 절감.
- Amazon EKS/Karpenter 같은 관리형 서비스는 운영 부담을 줄여주지만, 그만큼 벤더 종속(이식성 저하)이라는 트레이드오프가 붙는다.

---

## 🧠 내가 이해한 것 → 교정

**① "추론"이라는 단어의 두 가지 뜻**
- 내 생각: "학습은 배치성 단계, 추론은 모델을 사용할 때마다 발생하는 상시성 작업이다. 그리고 모델은 아웃풋을 내기 전에 추론 단계를 두기에 토큰을 더 사용한다."
- 🔧 교정: 한 문장 안에 **레벨이 다른 두 "추론"이 섞여 있음**. (a) inference — 학습(모델을 만드는 과정)의 반대말, 서빙 전체를 가리키는 이 글 제목의 "추론". 한 번 하고 끝나는 학습과 달리 요청마다 계속 발생. (b) reasoning — inference **안에서** 최종 답 전에 거치는 chain-of-thought류 사고 과정("생각하는 추론 단계"). (b)는 (a)의 부분집합이지 (a) 자체의 정의가 아님. → [추론(inference) vs 추론(reasoning)](../concepts/inference-vs-reasoning.md)

**② CoT/reasoning은 프롬프트 기법인가 학습된 능력인가**
- 내 질문: "CoT같은 건 모델 학습 내에서 추가로 학습되는 개념인가? 아니면 모델을 만들고 그 이후에 하네스와 같이 동작하는건가?"
- 답: 둘 다 있지만 세대가 다르다. 1세대(2022, "let's think step by step")는 순수 프롬프트 기법 — 가중치는 안 건드리고 하네스/프롬프트 레벨. 지금의 reasoning 모델(o1, Claude extended thinking 등)은 RL로 **가중치 자체에 내재화**된 행동. 하네스는 "얼마나 보여줄지·예산을 얼마 줄지"만 관리 → [추론(inference) vs 추론(reasoning)](../concepts/inference-vs-reasoning.md)

**③ Service의 랜덤 분산이 왜 문제인지 (자기회귀 + KV 캐시)**
- 내 생각: "llm은 auto regressive 방식으로 앞서 나온 아웃풋을 다음에도 반복해서 참조 → kv cache로 GPU 메모리에 두고 재사용. 근데 쿠버 서비스가 랜덤 분산하면 캐시 미스 증가 → 상태 인식 라우팅 필요 → AI 라우터(llm-d)."
- ✅ 맞음. 인과관계까지 정확하게 스스로 연결함 → [KV 캐시와 Prefill/Decode](../concepts/kv-cache-prefill-decode.md)

**④ 표준 레이어와 관리형 레이어를 하나로 뭉뚱그림**
- 내 생각: "결국 aws에서 지원하는 플랫폼 기술을 이용해서... llm-d와 같은 프레임워크를 사용해 모델의 자기 회귀를 더 효율적으로 동작하게 한다" / "AI 엔지니어는 인프라 효율성보다 모델·서비스·사용자 가치를 고민하면 된다."
- 🔧 교정: **llm-d는 AWS 기술이 아니다.** CNCF 샌드박스의 벤더 중립 오픈소스로 EKS든 GKE든 온프렘이든 동일하게 동작한다. 글의 구조는 두 축이다 — (a) llm-d/Gateway API Inference Extension = 어디서나 쓰는 표준 레이어, (b) EKS/Karpenter/Auto Mode = "그 표준 레이어가 돌아가는 클러스터를 누가 운영하냐"의 AWS 관리형 레이어. 이 둘을 합치면 글이 강조한 "이식성 vs 관리 편의" 트레이드오프 자체가 안 보이게 된다. 그리고 관리형 서비스는 인프라 고민을 **없애주는 게 아니라 다른 레이어(플랫폼팀)로 옮겨주는 것**이라, "AI 엔지니어는 고민 안 해도 된다"는 절반만 맞다 — 조직 어딘가는 여전히 그 트레이드오프를 의식적으로 선택해야 한다.

**⑤ Prefill/Decode 분리 = MSA식 장애 격리?**
- 내 질문: "prefill, decode 방식... msa와 같은 엔지니어적 방식으로 결국 기능간 부하나 버그 전파를 방지하기 위해 생긴 분리 같은데."
- 🔧 교정: 분리 이유가 다르다. MSA는 보통 **장애 전파 방지(blast radius)**가 핵심이지만, 여기는 **자원 성격이 정반대인 두 작업(연산 바운드 vs 메모리대역폭 바운드)을 한 풀에 두면 서로의 병목이 상대방에게 전이된다**는 게 이유다. 긴 프롬프트의 prefill이 GPU를 오래 잡으면 다른 사용자의 decode(토큰 생성 속도)가 밀리는 식. CPU-bound와 I/O-bound 작업을 별도 워커풀로 나누는 것에 더 가깝다 → [KV 캐시와 Prefill/Decode](../concepts/kv-cache-prefill-decode.md)

**⑥ Service가 "하나의 뭉뚱그려진 것"이라는 착각 — Pod IP / Service IP / iptables**
- 내 질문: "service가 ip를 pod에 배정해준다고 하는데 pod 하나당 ip를 하나씩 가져? node 기준이야?" / "iptables는 파드들의 ip 주소 목록이라고 생각하면 되는건가?"
- 🔧 교정: 뜯어보면 역할이 셋으로 쪼개져 있다.
  - **Pod IP**: CNI 플러그인이 Pod 생성 시 독립적으로 할당(Node IP와 별개 주소공간). Service와 무관하게 먼저 존재.
  - **Endpoints**: "이 Service는 어떤 Pod IP들을 가리키는가"의 **목록 자체**. Service는 자기 자신의 고정 IP(ClusterIP)를 갖고, 이 목록을 유지한다.
  - **iptables**: 목록이 아니라 **kube-proxy가 그 목록을 바탕으로 커널에 심어둔 규칙(rule)**. "이 목적지로 오는 패킷을 만나면 목록 중 하나로 바꿔 보내라"는 조건-동작 규칙 집합이지, 저장소가 아니다.
  → [K8s Service와 네트워킹](../concepts/kubernetes-service-networking.md)

---

## ❓ 궁금증 → 해소

- **일반 웹 K8s 흐름 이해가 맞았는지** (Ingress/Gateway→Service→Pod, 워크로드 종류, Cluster/Node/Namespace, Control Plane/Data Plane, etcd, kube-scheduler, kubelet, Docker Image/Container 등) → 큰 흐름은 맞았고, 세부 컴포넌트별 역할을 정리해 [K8s 기본 구조](../concepts/kubernetes-workload-basics.md)와 [K8s 컨트롤 플레인](../concepts/kubernetes-control-plane.md), [Docker 컨테이너 기본](../concepts/docker-container-basics.md)으로 뺐다.

---

## ⚖️ 비교표 — Service 랜덤 분산 vs AI 라우터(llm-d)

| | K8s Service (기본) | llm-d Router (EPP) |
|---|---|---|
| 라우팅 기준 | 무작위/라운드로빈 | KV 캐시 친화도 + 큐 깊이 + 부하 |
| 세션(대화 맥락) 인식 | 못 함 | 함 (같은 캐시 있는 파드 우선) |
| 캐시 미스 | 멀티턴마다 발생 가능 | 최소화 |
| 구현 위치 | kube-proxy + iptables | Envoy(Proxy) + EPP(Endpoint Picker) |
| 적합한 워크로드 | 상태 없는(stateless) 요청 | 상태(KV 캐시) 있는 LLM 서빙 |

---

## 🔁 도메인 안 가리는 패턴 (전이 가능)

1. **상태를 가진 작업에 상태를 모르는 균등 분산을 쓰면 항상 깨진다.** 이번엔 KV 캐시였지만, 세션 스티키니스가 필요한 어떤 시스템이든 같은 모양 — 라우팅 계층이 워크로드의 상태를 알아야 캐시/세션 재사용이 산다.
2. **자원 성격(바운드 지점)이 다른 두 작업을 한 풀에 섞지 마라.** 연산 바운드와 메모리·대역폭 바운드를 같이 두면 한쪽이 커질 때 다른 쪽이 굶는다 — 분리하면 각자 자기 병목 기준으로 독립 확장 가능.
3. **벤더 중립 표준 레이어와 벤더 종속 관리형 레이어를 구분해라.** 관리형 편의가 커질수록 이식성이 줄어드는 건 트레이드오프이지 공짜가 아니다 — 속도가 급하면 관리형, 이식성이 중요하면 상류 표준을 의식적으로 골라야 한다. 관리형은 인프라 고민을 "없애는" 게 아니라 "다른 레이어로 옮기는" 것.
4. **뭉뚱그려 보이는 추상화도 뜯으면 정책/데이터/실행이 분리돼 있다.** ([AWS gRPC 노트](2026-09-22-aws-grpc-rest.md)의 "모호한 단어는 축을 나눠라"와 같은 모양) Service는 하나의 오브젝트처럼 보이지만 실제로는 IP 할당(CNI)·목록 관리(Endpoints)·실행 규칙(iptables/kube-proxy)이 서로 다른 컴포넌트로 쪼개져 있다 — 이해가 안 될 때는 "이걸 누가 저장하고, 누가 결정하고, 누가 집행하는가"로 나눠서 물어라.

## 🎯 오늘 챙길 한 줄
> 뭔가 캐시가 안 먹거나 세션이 끊긴다면 먼저 물어라 — "이 라우팅/분산 계층이 상태를 아는가, 모르는가?" 모르면 반드시 깨진다.

## 📚 이 글로 정리한 개념
- [추론(inference) vs 추론(reasoning)](../concepts/inference-vs-reasoning.md) — 이 글 제목의 "추론"과 "생각하는 추론 단계"가 다른 레벨의 개념임을 구분해야 토큰 소비 증가의 진짜 원인이 보인다
- [KV 캐시와 Prefill/Decode](../concepts/kv-cache-prefill-decode.md) — 이 글이 캐시 미스 문제와 인프라 분리 아키텍처를 설명하는 근거
- [K8s Service와 네트워킹](../concepts/kubernetes-service-networking.md) — 이 글이 "일반 Service로 부하분산하면 안 되는 이유"를 설명하는 기반
- [K8s 기본 구조 (Pod/Node/Cluster/워크로드)](../concepts/kubernetes-workload-basics.md) — 이 글의 EKS 클러스터 아키텍처를 이해하는 뼈대
- [K8s 컨트롤 플레인 (etcd/스케줄러/kubelet)](../concepts/kubernetes-control-plane.md) — 이 글이 "쿠버네티스 운영에서 가장 어려운 것은 컨트롤 플레인"이라 말한 이유
- [Docker 컨테이너 기본](../concepts/docker-container-basics.md) — 이 글의 "ECR에서 컨테이너 pull" 단계가 뭘 하는지의 기반
