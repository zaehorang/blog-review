# K8s Ingress와 Ingress Controller

클러스터 **바깥에서 온 HTTP 요청**을 경로/호스트 규칙으로 Service에 연결하는 **L7** 계층.

| 부품 | 하는 일 |
|---|---|
| Pod | 컨테이너가 도는 단위. 수시로 생기고 사라지고 IP도 바뀜 |
| [Service](kubernetes-service-networking.md) | Pod 묶음 앞의 **고정 주소**, 살아 있는 Pod들에 분배 (L4) |
| **Ingress** | 바깥 HTTP 요청을 경로/호스트로 Service에 연결 (L7) |

## 규칙(선언)과 실행은 다른 것이다

Ingress는 **규칙을 적은 문서**일 뿐이고, 실제로 받아서 전달하는 건 **Ingress Controller**(Traefik, Nginx 등)다. 규칙은 그대로 두고 구현체만 바꿀 수 있다 — "아마 traefik인데 확정은 아님"이 가능한 이유. ([리버스 프록시](reverse-proxy.md)의 "필수는 구현체가 아니라 역할")

```yaml
kind: Ingress
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /api     # → be 서비스
        backend: { service: { name: be,       port: { number: 8000 } } }
      - path: /auth    # → keycloak 서비스
        backend: { service: { name: keycloak, port: { number: 8080 } } }
      - path: /        # → web 서비스
        backend: { service: { name: web,      port: { number: 80 } } }
```

라우팅은 코드가 아니라 **선언한 설정**이다 → [선언형 설정](kubernetes-workload-basics.md#선언형-설정--compose-yml-vs-k8s-yaml). 요즘은 후속 격인 **Gateway API**도 쓰이지만 개념(앞단에서 규칙으로 라우팅)은 같다.

## 서비스가 "별개"라는 말의 뜻

`/auth`, `/api`는 **URL 경로(엔드포인트)** 일 뿐이고, 뒤의 web·be·keycloak은 **각각 따로 배포되는 별개 서비스**(한 네임스페이스 안)다. 한 서버 안에 두 경로가 있는 것과는 다른 층위 — 경로가 여럿이어도 서비스가 하나면 앞단 라우팅은 필요 없다.

**관련:** [K8s Service와 네트워킹](kubernetes-service-networking.md) · [K8s 기본 구조](kubernetes-workload-basics.md) · [리버스 프록시](reverse-proxy.md) · [네트워크 계층](network-layers.md) · [TLS 종료](tls-termination.md)
**처음 나온 노트:** [이랜서 — Nginx 앞단](../reviews/2026-11-11-elancer-nginx-reverse-proxy.md)
