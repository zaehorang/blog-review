# NLI (Natural Language Inference)

두 문장의 관계를 **모델이 3분류**하는 것.

| 분류 | 뜻 |
|---|---|
| **entailment** | 앞 문장이 뒤 문장을 뒷받침함 |
| **contradiction** | 서로 모순됨 |
| **neutral** | 관계 없음 |

## 어디에 쓰나

- **Faithfulness** — "주장 vs 원문 span"이 entailment인가 → 근거가 진짜 받쳐주는지 **자동 판정**
- **Consistency** — 두 근거가 contradiction인가 → 충돌 **자동 감지**

⚠️ 헷갈리기 쉬운 점: NLI는 **관계 자동 판정기(앞단)**다. "사람이 판단할 것으로 분류하는 단계"가 아니다. `disputed` 같은 상태로 사람에게 넘기는 건 그 **뒤의 후속 흐름**이고, 둘은 다른 층이다.

**나온 곳:** [토스 LLM Topic](../reviews/2026-08-03-toss-llm-context-topic.md)
