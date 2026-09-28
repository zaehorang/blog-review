# Docker 컨테이너 기본 — Image / Container / Runtime

- **Image**: 컨테이너를 만들기 위한 실행 가능한 템플릿 — 코드+런타임+라이브러리를 하나로 굳힌 것. `docker build`로 만들고 `docker push`로 레지스트리(Docker Hub, ECR)에 올린다.
- **Container**: Image를 실제로 **실행한 인스턴스**. Image가 "클래스"면 Container는 "객체"에 가깝다.
- **Container Runtime**: Node 위에서 실제로 컨테이너를 실행시키는 엔진(containerd, CRI-O). K8s는 이걸 직접 만들지 않고 표준 인터페이스(CRI)로 위임한다.

## 컨테이너 하나가 뜨는 전체 흐름

1. 개발자가 Image를 만들어 레지스트리에 push
2. API 서버에 "이 Image로 Pod 띄워줘" 요청 → etcd에 기록
3. [kube-scheduler](kubernetes-control-plane.md)가 적합한 Node 선정
4. 그 Node의 [kubelet](kubernetes-control-plane.md)이 감지 → Container Runtime에게 Image pull + 실행 지시
5. [kube-proxy](kubernetes-service-networking.md)가 Service 라우팅 룰을 갱신해 외부에서 접근 가능해짐

이 흐름에서 "Amazon ECR에서 추론 엔진(vLLM 등) 컨테이너를 pull해서 실행"하는 단계는 4번에 해당한다.

## 기타 필수 오브젝트

- **ConfigMap / Secret**: 설정값/민감정보를 컨테이너 이미지에 안 박고 외부에서 주입.
- **PersistentVolume(PV) / PersistentVolumeClaim(PVC)**: Pod는 죽으면 데이터도 날아가는 게 기본이라, 살아남아야 하는 데이터(모델 가중치, DB)는 이 볼륨 추상화로 붙인다. EBS/EFS/FSx가 실제 구현체.

**관련:** [K8s 기본 구조](kubernetes-workload-basics.md) · [K8s 컨트롤 플레인](kubernetes-control-plane.md)
**처음 나온 노트:** [SK DEVOCEAN — 쿠버네티스로 여는 AI 추론 인프라](../reviews/2026-09-28-devocean-k8s-inference.md)
