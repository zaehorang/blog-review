# KV 캐시와 Prefill/Decode

LLM은 **자기회귀(autoregressive)** 방식으로 동작한다 — 이전 토큰들을 참고해야 다음 토큰을 만들 수 있다. 매번 이전 토큰 전체를 처음부터 다시 계산하면 낭비이므로, 이미 계산된 토큰들의 **Key/Value 값을 GPU 메모리에 저장해두고 재사용**한다. 이게 KV 캐시다. 컨텍스트가 길어질수록 사용자 세션 하나가 수십~수백 GB의 GPU 메모리(HBM)를 점유할 수 있다.

## 두 단계 — 성격이 정반대

- **Prefill**: 사용자가 보낸 프롬프트 전체를 **한 번에 병렬로** 처리해 KV 캐시를 채우는 단계. 행렬 곱셈이 몰리는 **연산(compute) 바운드** — GPU 코어를 최대한 갈아 넣는 쪽.
- **Decode**: 이후 토큰을 **하나씩 순차로** 생성하는 단계. 매 스텝마다 쌓인 KV 캐시 전체를 GPU 메모리에서 읽어와야 해서 계산량은 적지만 **메모리 대역폭이 병목** — 사용자가 체감하는 "타이핑 속도"라 지연에 민감하다.

## 왜 같은 GPU에 섞으면 안 되나

긴 프롬프트의 prefill이 GPU를 오래 붙잡고 있으면, 그동안 다른 사용자의 decode(토큰 하나씩 뱉는 것)가 밀린다. 한 사람의 입력이 길다고 다른 사람의 응답 속도가 끊기는 셈.

**분리하는 이유는 장애 격리(MSA의 blast radius)가 아니라, 자원 성격이 정반대인 두 작업을 한 풀에 두면 서로의 병목이 상대방에게 전이되기 때문**이다 — CPU-bound와 I/O-bound 작업을 별도 워커풀로 나누는 패턴에 더 가깝다.

## 해결: Prefill/Decode 풀 분리

prefill 전용 풀과 decode 전용 풀로 GPU를 나누고, prefill 풀에서 만든 KV 캐시를 NIXL(NVIDIA Inference Transfer Library) 같은 라이브러리로 RDMA를 통해 decode 풀의 GPU 메모리로 **직접** 전송한다. 각 풀을 자기 병목(연산 vs 메모리대역폭) 기준으로 독립적으로 확장할 수 있어 처리량 최대 2배, 비용 30~40% 절감 효과가 보고된다.

## 랜덤 부하분산과의 충돌

일반 로드밸런서(K8s Service 등)는 상태를 모르고 무작위/라운드로빈으로 분산한다. 멀티턴 대화의 후속 요청이 다른 파드로 튀면 그 파드엔 KV 캐시가 없어 모든 토큰을 처음부터 재연산해야 한다 → 캐시 미스. 그래서 KV 캐시가 있는 파드를 찾아가는 **상태 인지 라우팅(inference-aware router)**이 필요해진다 → [K8s Service와 네트워킹](kubernetes-service-networking.md)

**관련:** [추론(inference) vs 추론(reasoning)](inference-vs-reasoning.md) · [K8s Service와 네트워킹](kubernetes-service-networking.md)
**처음 나온 노트:** [SK DEVOCEAN — 쿠버네티스로 여는 AI 추론 인프라](../reviews/2026-09-28-devocean-k8s-inference.md)
