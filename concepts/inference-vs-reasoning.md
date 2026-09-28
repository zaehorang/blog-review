# 추론(inference) vs 추론(reasoning)

한국어 AI 담론에서 "추론"은 레벨이 다른 두 개념을 동시에 가리켜서 헷갈리기 쉽다.

## 뜻 A — inference (서빙)

**학습(training)의 반대말.** 이미 학습이 끝난 모델(가중치)을 가지고 입력을 받아 출력을 계산하는 실행 단계 전체를 가리킨다.

- 학습: 모델을 **만드는** 과정. 한 번(또는 주기적으로) 하고 끝나는 **배치성** 작업.
- 추론(inference): 만들어진 모델을 **돌려서 답을 뽑는** 과정. 서비스가 살아있는 한 요청마다 계속 발생하는 **상시성** 작업.

"추론 인프라"라고 할 때의 추론은 이 뜻이다.

## 뜻 B — reasoning (사고 과정)

뜻 A(inference) **안에서**, 최근 모델들이 최종 답을 내기 전에 거치는 chain-of-thought류 중간 사고 과정. [CoT는 두 세대로 나뉜다](chain-of-thought-reasoning.md) — 순수 프롬프트 기법이었던 1세대와, RL로 가중치 자체에 내재화된 2세대(reasoning 모델).

## 왜 구분해야 하나

뜻 B는 뜻 A의 **부분집합**이지, 뜻 A 자체를 정의하지 않는다. "요청 하나가 쓰는 토큰이 늘었다"는 현상을 뜻 B(reasoning 토큰 증가)로만 읽으면, 더 근본적인 이유 — **서빙 자체가 학습과 달리 상시 발생하는 워크로드라는 구조** — 를 놓친다. reasoning 토큰 증가는 그 위에 얹힌 추가 요인일 뿐이다.

**관련:** [Chain-of-Thought / Reasoning 모델](chain-of-thought-reasoning.md) · [KV 캐시와 Prefill/Decode](kv-cache-prefill-decode.md)
**처음 나온 노트:** [SK DEVOCEAN — 쿠버네티스로 여는 AI 추론 인프라](../reviews/2026-09-28-devocean-k8s-inference.md)
