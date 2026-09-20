# A2A (Agent2Agent Protocol)

Google이 주도한 개방 표준. 서로 다른 벤더·프레임워크로 만들어진 에이전트들끼리 **통신하고 협업**하게 해주는 프로토콜이다.

## 구조

```
[Agent A] ──"나 이런 능력 있어" (Agent Card)──▶ [Agent B]
[Agent A] ──"이 작업 좀 맡아줘" (Task 요청)────▶ [Agent B]
[Agent A] ◀────── 결과/상태 업데이트 ──────────── [Agent B]
```

- 각 에이전트가 **Agent Card**(자기소개서 같은 JSON — 무슨 능력이 있는지)를 공개한다.
- 에이전트끼리 **Task**를 주고받으며 위임·협업한다 (JSON-RPC 기반).
- "도구를 가진 쪽 ↔ 쓰는 쪽"이 아니라 **동등한 에이전트끼리의 수평적 연결** 표준.

## [[mcp]]와의 차이
A2A는 **에이전트 ↔ 에이전트** 축, MCP는 **에이전트 ↔ 데이터/도구** 축을 표준화한다.

## 처음 나온 노트
[SK AX — 답변에서 실행으로, AI Agent의 활용도를 결정하는 업무 맥락](../reviews/2026-09-21-skax-agent-context.md)

> 참고: 두 표준이 2026년 8월 Linux Foundation 산하 Agentic AI Foundation으로 통합됐다는 서술은 원문(SK AX 글) 인용이며, 에이전트가 별도로 검증한 사실은 아니다(지식 컷오프 이후 시점).
