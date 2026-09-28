# K8s 기본 구조 — Pod / Node / Cluster / 워크로드

작은 것부터 큰 것 순서로.

- **Pod**: 가장 작은 배포 단위. 컨테이너 1개(+가끔 사이드카)를 감싸는 껍데기.
- **Node**: Pod가 올라가는 실제 서버 한 대(EC2 인스턴스 등). 한 Node에 Pod 여러 개가 뜰 수 있다.
- **Cluster**: 여러 Node를 묶은 전체 시스템 하나.
- **Namespace**: 클러스터 하나를 팀별/환경별로 나누는 **논리적** 구역. 물리적 분리가 아니라 이름공간 분리.

## 워크로드 (Workload)

"클러스터에서 실행하고 싶은 작업" 전체를 가리키는 포괄적 용어. Pod를 직접 만들지 않고 보통 아래로 감싸서 쓴다.

- **Deployment**: "이 이미지로 Pod를 N개 유지해줘" — stateless 워크로드(웹서버, API 서버)의 기본. Pod가 죽으면 자동 재생성, 롤링 업데이트 관리.
- **StatefulSet**: 각 Pod가 고유한 정체성(이름, 저장소)을 유지해야 하는 워크로드(DB, 캐시). LLM 서버처럼 "이 Pod엔 이 KV 캐시가 있다"가 중요한 경우 이쪽에 가깝다.
- **DaemonSet**: 모든(또는 특정) Node마다 Pod 하나씩 반드시 띄우는 것 (로그 수집기, 모니터링 에이전트).
- **Job / CronJob**: 한 번 실행하고 끝나는 배치 작업. 모델 학습처럼 배치성인 작업은 Job에, 상시 서빙은 Deployment/StatefulSet에 어울린다.

**전체 포함 관계:** Cluster(전체) ⊃ Control Plane + Data Plane(Node들) ⊃ Node(서버) ⊃ Pod(컨테이너 묶음)

**관련:** [K8s 컨트롤 플레인](kubernetes-control-plane.md) · [K8s Service와 네트워킹](kubernetes-service-networking.md) · [Docker 컨테이너 기본](docker-container-basics.md)
**처음 나온 노트:** [SK DEVOCEAN — 쿠버네티스로 여는 AI 추론 인프라](../reviews/2026-09-28-devocean-k8s-inference.md)
