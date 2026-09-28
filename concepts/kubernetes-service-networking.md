# K8s Service와 네트워킹 — Pod IP / Endpoints / kube-proxy / iptables

Service는 "하나의 뭉뚱그려진 것"처럼 보이지만, 실제로는 역할이 셋으로 쪼개져 있다.

## Pod IP — Service와 무관하게 먼저 존재

Pod 하나당 고유한 IP를 하나 가진다(같은 Pod 안 컨테이너들은 공유). 이 IP는 클러스터 내부 사설 IP고, Pod가 뜰 때 **CNI 플러그인**(Calico, Cilium, AWS VPC CNI 등)이 할당한다. Node도 자기 자신의 IP(호스트 IP)를 따로 가지며, 이는 Pod IP와 완전히 별개의 주소 공간이다(Node IP = 건물 주소, Pod IP = 건물 안 각 방 호수).

## Service — 자기 자신의 고정 IP를 가짐

Service는 Pod한테 IP를 배정해주는 게 아니라, **자기 자신의 IP(ClusterIP)를 따로 발급**받는다. Pod IP는 재생성 때마다 바뀔 수 있지만 Service IP는 고정 — 이게 Service가 "안정적인 단일 접근점" 역할을 하는 이유다.

## Endpoints — 목록

Service가 레이블 셀렉터로 "나랑 매칭되는 Pod들"을 찾아 그 IP 목록을 기록해두는 오브젝트. **"파드 IP 목록"에 해당하는 게 바로 이것**이다.

## kube-proxy + iptables — 목록이 아니라 실행 규칙

iptables는 목록을 저장하는 곳이 아니라, **kube-proxy가 Endpoints 목록을 바탕으로 Node의 리눅스 커널에 심어두는 규칙(rule)**이다. "이 Service ClusterIP로 오는 패킷을 만나면, 목적지를 Endpoints 중 하나로 바꿔서(DNAT) 전달해라" 같은 조건-동작 규칙들의 집합. 패킷이 올 때마다 이 규칙을 타고 즉시 리다이렉트된다.

## 전체 흐름

1. **Endpoints (데이터)**: Service X → Pod IP [10.0.1.2, 10.0.1.5, 10.0.1.9]
2. **kube-proxy (변환기)**: 이 목록이 바뀔 때마다 감지해 iptables 규칙을 다시 씀
3. **iptables (실행 규칙)**: 커널 레벨에서 매 패킷마다 목록 중 하나로 확률적으로(랜덤) 목적지를 바꿔 전달

## Ingress / Gateway API

클러스터 **바깥**에서 들어오는 트래픽을 어떤 Service로 보낼지 정하는 L7 규칙(도메인/경로 기반). Gateway API는 Ingress의 차세대 표준이고, **GAIE(Gateway API Inference Extension)**는 여기에 추론 특화 라우팅 규칙(캐시 친화도, 큐 깊이 등)을 얹은 확장이다.

## 왜 LLM 서빙에서 문제가 되나

iptables 규칙 자체가 세션/캐시 상태를 전혀 모르고 확률적으로 목적지를 고르기 때문에, 같은 대화의 다음 요청도 다른 Pod로 튈 수 있다 → [KV 캐시와 Prefill/Decode](kv-cache-prefill-decode.md)의 캐시 미스 문제로 이어진다. llm-d 같은 inference-aware router는 이 iptables 레이어를 그대로 두는 대신, 그 앞단(Envoy + EPP)에서 캐시 친화도를 보고 목적지를 먼저 정한다.

**관련:** [K8s 기본 구조](kubernetes-workload-basics.md) · [K8s 컨트롤 플레인](kubernetes-control-plane.md) · [KV 캐시와 Prefill/Decode](kv-cache-prefill-decode.md) · [서비스 디스커버리와 게이트웨이](service-discovery-gateway.md)
**처음 나온 노트:** [SK DEVOCEAN — 쿠버네티스로 여는 AI 추론 인프라](../reviews/2026-09-28-devocean-k8s-inference.md)
