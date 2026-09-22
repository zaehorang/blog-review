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

**관련:** [HTTP](http.md) · [REST](rest.md) · [RPC](rpc.md) · [gRPC](grpc.md)
**처음 나온 노트:** [AWS — gRPC vs REST](../reviews/2026-09-22-aws-grpc-rest.md)
