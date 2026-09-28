# K8s 컨트롤 플레인 — etcd / 스케줄러 / kubelet

## Control Plane vs Data Plane

- **Control Plane**: 클러스터의 "두뇌" — API 서버, etcd, 스케줄러, 컨트롤러들. "무엇을 어디에 배치할지" 결정만 하고 실제 워크로드는 안 돌린다.
- **Data Plane**: 실제 Pod들이 돌아가는 Node들. Control Plane의 결정을 실행하는 쪽.

Amazon EKS 기준: 기본 EKS는 Control Plane을 AWS가 관리하고 Data Plane(워커 노드용 EC2)은 사용자가 관리한다. **EKS Auto Mode**는 Data Plane까지 AWS가 관리한다.

## etcd

Control Plane 안의 **분산 key-value 저장소**. 클러스터의 모든 상태(어떤 Pod가 몇 개 떠 있어야 하는지, 어떤 Node에 뭐가 배치돼 있는지, Service가 어떤 Pod를 가리키는지)가 여기 저장된다. API 서버는 사실상 **etcd의 관문**일 뿐이고, 실질적인 진실의 원천(source of truth)은 etcd다.

**Raft 합의 알고리즘**으로 여러 대(최소 3대, 홀수 개)가 복제본을 유지해 한 대가 죽어도 과반수만 살아있으면 상태가 안 날아간다. etcd가 망가지면 클러스터 전체가 "지금 뭐가 어디 떠 있는지"를 모르게 되는 것이라, 쿠버네티스 운영에서 컨트롤 플레인이 가장 어렵다고 하는 이유의 핵심이 여기 있다.

## kube-scheduler

새로 만들어진 Pod를 **어느 Node에** 배치할지 결정하는 Control Plane 컴포넌트.

1. 사용자가 Pod 생성 요청 → API 서버 → etcd에 "아직 Node 미배정" 상태로 기록
2. 스케줄러가 감지 → 각 Node의 남은 CPU/메모리/GPU, Pod 요구 스펙(예: GPU 1개), 어피니티 규칙 등을 보고 점수 매겨 최적 Node 선택
3. 결정을 API 서버 통해 etcd에 기록 → 해당 Node의 kubelet이 보고 실제로 컨테이너를 띄움

GPU 워크로드에서는 스케줄러가 더 정교해진다 — **갱 스케줄링(Kueue·Volcano)**은 여러 Pod를 한 세트로 묶어 전부 배치 가능할 때만 한꺼번에 스케줄링하고, **DRA**는 GPU를 정수 단위가 아니라 쪼개서 배분 판단을 가능하게 한다.

## kubelet

각 Node에서 도는 에이전트. Control Plane의 "이 Node에 이런 Pod가 떠 있어야 해" 지시를 받아, Container Runtime에게 실제로 컨테이너를 띄우라고 시키고 상태를 계속 보고한다. Node의 "손발" 역할.

**관련:** [K8s 기본 구조](kubernetes-workload-basics.md) · [K8s Service와 네트워킹](kubernetes-service-networking.md)
**처음 나온 노트:** [SK DEVOCEAN — 쿠버네티스로 여는 AI 추론 인프라](../reviews/2026-09-28-devocean-k8s-inference.md)
