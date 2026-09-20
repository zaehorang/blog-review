# MCP (Model Context Protocol)

Anthropic이 만든 개방 표준. LLM/에이전트가 외부 데이터 소스나 도구(DB, 사내 시스템, API, 파일 등)에 붙을 때, 조합마다 커스텀 연동을 짜지 않고 **표준화된 방식으로 접근**하게 해준다. "USB-C 포트" 비유가 흔히 쓰인다 — 어떤 모델이든 MCP 서버만 있으면 그 데이터 소스에 붙을 수 있다.

## 구조

```
[Host (Claude, IDE 등)]
     │
     ▼
[MCP Client] ──── 1:1 연결 ────▶ [MCP Server A] → DB, 파일, 사내 시스템
     │
     └────────── 1:1 연결 ────▶ [MCP Server B] → API, 캘린더 등
```

- Host가 여러 MCP Client를 띄우고, 각 Client가 MCP Server 하나와 연결(1:1)된다.
- Server는 자신이 가진 **Resources**(데이터), **Tools**(호출 가능한 함수), **Prompts**(템플릿)를 표준 포맷으로 노출한다.
- "데이터/도구를 가진 쪽(Server)"과 "그걸 쓰는 쪽(Client/Host)" 사이의 **수직적 연결** 표준.

## [[a2a]]와의 차이
MCP는 **에이전트 ↔ 데이터/도구** 축, A2A는 **에이전트 ↔ 에이전트** 축을 표준화한다.

## 처음 나온 노트
[SK AX — 업무 맥락(Context)에서 AXgenticWire MI까지](../reviews/2026-09-21-skax-agenticwire.md)
