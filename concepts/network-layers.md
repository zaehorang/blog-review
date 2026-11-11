# 네트워크 계층 (TCP/IP 4계층)

```
[응용 계층]          HTTP, gRPC, FTP, DNS ...     "무슨 내용을 주고받나"
[전송 계층]          TCP, UDP                     "신뢰성 있게 보내나, 빠르게 보내나"
[인터넷 계층]         IP                           "어디로 보내나 (주소·라우팅)"
[네트워크 접근 계층]   Ethernet, Wi-Fi ...          "물리적으로 어떻게 전달하나"
```

OSI 7계층을 실무에서 뭉뚱그린 버전. HTTP·REST·RPC·gRPC는 전부 **응용 계층**에 있고, 그 밑을 [TCP](tcp-vs-udp.md)가 받친다.

## 왜 계층을 먼저 맞추고 비교해야 하나

REST·RPC·gRPC·HTTP·TCP를 한 줄에 놓고 비교하면 헷갈린다 — 서로 다른 층에 있는 개념이기 때문. **"설계 스타일"(REST) vs "구현체"(gRPC) vs "프로토콜"(HTTP) vs "전송"(TCP)**로 층을 나누면 정리된다.

```
[설계 스타일]    REST          RPC
[구현/형용사]    RESTful       gRPC (구체적 구현체)
[프로토콜]       HTTP (1.1/2)
[전송]           TCP
```

## L4 / L7 — OSI 번호와 로드밸런서

OSI 번호로 부르면 **L7 = 응용 계층(HTTP)**, **L4 = 전송 계층(TCP/UDP + 포트)**, L3 = IP. 한 요청이 지나는 순서:

```
L3  IP        ① DNS로 example.com → 1.2.3.4 (어느 컴퓨터로)
L4  TCP/포트  ② 1.2.3.4의 443번 포트와 TCP 연결 (어느 프로그램에게, 믿을 수 있게)
    TLS       ③ 암호화 협상 (HTTPS의 'S')
L7  HTTP      ④ "GET /api/users, Host: example.com" 전송 (요청 내용)
```

- **L4 로드밸런서:** IP·포트만 보고 뒤로 넘긴다. 내용은 안 열어서 빠르고 단순하지만 `/api`와 `/auth`를 구분하지 못한다. (K8s Service가 이 수준)
- **L7 로드밸런서:** HTTP를 읽고 경로·호스트·헤더로 라우팅한다. Nginx, K8s [Ingress](kubernetes-ingress.md)가 여기.
- **L7로 경로를 읽으려면 먼저 암호화를 풀어야 한다** → [TLS 종료](tls-termination.md).
- "라우팅"(어디로 보낼지 *내용*으로 판단)은 L7이 있어야 하고, "분산"(여러 대에 나눔)은 L4로도 된다 — 둘은 다른 기능.

**관련:** [HTTP](http.md) · [REST](rest.md) · [RPC](rpc.md) · [gRPC](grpc.md) · [리버스 프록시](reverse-proxy.md) · [TLS 종료](tls-termination.md) · [K8s Ingress](kubernetes-ingress.md)
**처음 나온 노트:** [AWS — gRPC vs REST](../reviews/2026-09-22-aws-grpc-rest.md) · L4/L7 절은 [이랜서 — Nginx 앞단](../reviews/2026-11-11-elancer-nginx-reverse-proxy.md)
