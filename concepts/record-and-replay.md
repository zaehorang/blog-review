# Record and replay

말이나 프롬프트로 설명하기 어려운 작업을, 사람이 한 번 **시연(녹화)**해 두면 에이전트가 그 조작을 **재생**해 반복하는 방식.

- 쓰는 이유: API가 있으면 [MCP](middleware.md) 등으로 붙이면 되지만, API가 없는 레거시·사내 툴은 시연이 유일한 자동화 통로. 인터페이스 없는 시스템에 임시 인터페이스를 씌우는 셈.
- 한계: 재생이 화면 좌표·DOM 구조에 묶이면 UI가 조금만 바뀌어도 깨진다. 안정적 자동화라기보다 "프롬프트/API로 표현하기 전 단계의 임시 다리".

관련 개념: [agent-device](agent-device.md) (접근성 트리로 같은 문제를 더 견고하게 푸는 방향), [에이전틱 워크플로우 루프](agentic-workflow-loop.md)
처음 나온 노트: [OpenAI에서 직접 알려주는 Codex 사용법](../reviews/2026-09-04-channel-codex-usage.md)
