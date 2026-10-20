# ECS와 Fargate

- **Amazon ECS**: AWS의 컨테이너 **오케스트레이터**. 컨테이너를 몇 개 띄울지(원하는 개수 유지), 죽으면 다시 띄우기, 늘리고 줄이기, 로드밸런서에 연결하기를 맡는다. 쿠버네티스가 하는 일을 AWS 방식으로 하는 서비스다.
- **AWS Fargate**: 그 컨테이너를 돌릴 **서버(CPU·메모리)를 AWS가 대신 마련해주는** 실행 방식. 서버 OS 패치나 용량 계획을 하지 않는다. 안 쓰면 EC2 방식이 되고, 이때는 서버를 직접 관리한다.

> ECS = **무엇을 몇 개, 어떻게** 돌릴지 정하는 관리자 / Fargate = 그걸 돌릴 **서버를 대신 마련**해주는 실행 환경

Fargate를 "서버 컨테이너"로 외우면 컨테이너의 한 종류처럼 오해된다. "서버를 직접 관리하지 않는(serverless) 실행 방식"으로 기억한다.

## 쿠버네티스와의 대응

| | ECS | 쿠버네티스 (AWS에선 EKS) |
|---|---|---|
| 정체 | AWS 전용 | 오픈소스 표준, 어디서나 동작 |
| 복잡도 | 개념이 적고 단순 | 개념이 많고 강력, 학습 비용 큼 |
| 용어 | Task Definition, Task, Service | Pod, Deployment, Service |

Task ≈ Pod, ECS Service ≈ Deployment+Service(원하는 개수 유지). EKS에도 Fargate 조합이 있어서 "오케스트레이션과 실행 인프라의 분리"는 두 쪽에 똑같이 있다.

**관련:** [K8s 기본 구조](kubernetes-workload-basics.md) · [Docker 컨테이너 기본](docker-container-basics.md) · [VPC와 subnet](vpc-subnets.md)
**처음 나온 노트:** [올리브영 — AI 기반 운영 이슈 분석과 일일 점검 자동화](../reviews/2026-10-20-oliveyoung-ops-agent-bedrock.md)
