# Bedrock · Strands Agents · AgentCore Runtime

에이전트 스택의 세 층. 글에 걸린 공식 링크(Bedrock 소개 페이지, strandsagents.com, AgentCore 개발자 가이드)를 읽고 정리했다.

| | 무엇 | 한 줄 |
|---|---|---|
| **Amazon Bedrock** | 생성형 AI 앱·에이전트를 만드는 AWS **플랫폼** | 모델 API만이 아니라 Knowledge Bases, Guardrails, Agents/Flows, AgentCore까지 포함 |
| **Strands Agents SDK** | 프로덕션용 에이전트를 만드는 **오픈소스** 툴킷 | 도구·MCP·멀티에이전트(Swarm, Graph 등)·세션/메모리·관측성. Bedrock 외 모델(OpenAI, Ollama 등)과 AgentCore·Lambda·Fargate·EKS 배포 지원 |
| **AgentCore Runtime** | 에이전트/도구를 올려 실행하는 **서버리스 호스팅** | 프레임워크·모델 무관, 세션마다 전용 microVM 격리, MCP·A2A 프로토콜 |

## AgentCore Runtime 핵심 사실 (공식 문서)
- 사용자 세션마다 전용 microVM(CPU·메모리·파일시스템 격리)이 뜨고, 세션이 끝나면 종료되며 메모리는 정화된다. 비결정적인 AI 처리에서도 결정적인 보안을 주겠다는 설계.
- 실행 시간: microVM 최대 8시간, Instances(EC2 기반) 최대 14일.
- 소비 기반 과금 — LLM 응답을 기다리는 I/O 대기 중엔 CPU 과금이 거의 없다고 설명한다.
- 인증(Okta·Entra ID·Cognito 연동), 에이전트 추론·도구 호출 트레이싱, 100MB 페이로드, WebSocket 양방향 스트리밍.
- 더 새로운 V2 플랫폼 버전이 나와 있다 → 서비스가 아직 빠르게 변한다.

## 장단점
- **장점:** 모델 서빙·에이전트 루프·호스팅·격리를 직접 만들지 않아도 된다. 데이터를 저장하거나 학습에 쓰지 않는다고 명시(Bedrock). 권한·감사는 AWS 체계를 그대로 쓴다.
- **단점:** AWS 종속이 겹겹이 늘어난다. 소개 페이지에는 제약이 적혀 있지 않고(쿼터·리전별 모델·모델별 제한은 개발자 문서 확인), 성능 수치는 제공사 주장이다. 단순한 에이전트에는 과할 수 있다(내 판단).
- **확인 못 한 것:** Strands가 "model-driven"이라는 설명은 이번에 읽은 페이지(메뉴 위주)에서 확인되지 않았다.

**관련:** [MCP](mcp.md) · [A2A](a2a.md) · [에이전트 하네스](agent-harness.md) · [ECS와 Fargate](ecs-fargate.md)
**처음 나온 노트:** [올리브영 — AI 기반 운영 이슈 분석과 일일 점검 자동화](../reviews/2026-10-20-oliveyoung-ops-agent-bedrock.md)
