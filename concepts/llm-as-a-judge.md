# LLM-as-a-judge

정해진 툴 시퀀스나 문자열을 정확히 맞추기 어려운 **복잡하고 모호한 결과**를, 별도의 LLM 호출로 "이 결과가 조건을 만족하는가"를 판정하게 하는 평가 방식.

예: "에이전트가 변경 후 어떤 형태로든 자체 검증(테스트 실행, 타입체크, 린트 등)을 시도했는가?"처럼, 정확히 어떤 도구를 어떤 순서로 썼는지는 강제하지 않고 **행위의 흔적이 있었는가**만 판정한다.

- 쓰는 이유: 단순 작업은 엄격한 단일 단언(정확한 툴 시퀀스 검사)으로 충분하지만, 복잡한 작업에 그걸 강제하면 오탐이 늘어난다 — "avoid enforcing a rigid tool sequence. Instead, use fuzzier, outcome-based checks".
- 대가: 판정 자체가 또 다른 모델 호출이라 비결정적 — 그래서 단일 실행이 아니라 배치로 돌려 합산 통과율(aggregate pass rate)을 봐야 신호가 안정된다.

## 관련 개념
- [행동 평가 (Behavioral Evaluation)](behavioral-evaluation.md)

## 처음 나온 노트
[Google — AI 코딩 에이전트 하네스 엔지니어링](../reviews/2026-09-14-google-agent-harness-engineering.md)
