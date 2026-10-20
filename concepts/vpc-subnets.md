# VPC와 public/private subnet

- **VPC (Virtual Private Cloud)**: AWS 안에 만드는 **내 전용 가상 네트워크**. 안의 리소스는 사설 IP로 통신하고, 바깥과의 통로는 직접 열어준다. 회사 건물 전체에 해당한다.
- **Subnet**: VPC를 쪼갠 구역. 구역마다 "바깥 인터넷과 직접 통하는가"를 다르게 설정한다.

| | Public subnet | Private subnet |
|---|---|---|
| 인터넷 직접 연결 | 있음 (Internet Gateway로 가는 경로) | 없음 |
| 두는 것 | 바깥에 노출돼야 하는 입구 (로드밸런서 등) | 내부 로직, DB, 백엔드 |
| 비유 | 로비·안내데스크 | 직원 사무실 |

**핵심 원리:** 외부 요청은 로비(ALB)까지만 오고 실제 일하는 서버는 외부에서 직접 닿지 않는 안쪽에 둔다. 서버가 뚫려도 피해 범위를 줄이는 **최소 노출** 구조다.

Private subnet의 서버가 바깥(외부 API, 관리형 서비스)을 호출해야 할 때는 보통 NAT Gateway나 VPC Endpoint 같은 경로를 쓴다. 이 경로는 아키텍처 그림에서 생략되기 쉽다.

**관련:** [ECS와 Fargate](ecs-fargate.md) · [네트워크 계층](network-layers.md)
**처음 나온 노트:** [올리브영 — AI 기반 운영 이슈 분석과 일일 점검 자동화](../reviews/2026-10-20-oliveyoung-ops-agent-bedrock.md)
