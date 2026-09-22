# RPC (Remote Procedure Call)

"원격 함수를 로컬 함수처럼 호출한다"는 **통신 패러다임(개념)** — 그 자체가 구체적 프로토콜은 아니다. [REST](rest.md)보다 먼저부터 있던 오래된 모델이고, XML-RPC·JSON-RPC·CORBA·gRPC 등 여러 구현체가 있다.

- **서비스(함수/프로시저) 지향 설계** — 클라이언트가 서버의 함수를 직접 호출하는 것처럼 동작. 예: `createOrder(customer_id, item_id)`
- REST가 "무엇(리소스)을 조작하나"를 본다면, RPC는 "무엇을 실행하나(동작)"를 본다.

## gRPC로 구체화되면

[gRPC](grpc.md)는 proto 파일에 함수 시그니처를 정의해두고, 컴파일러가 그 정의로 **클라이언트/서버 코드를 자동 생성**한다. 그래서 클라이언트 코드는 진짜 로컬 함수처럼 `client.createOrder(id)`를 호출할 수 있다.

이게 RPC(gRPC)가 REST보다 **긴밀하게 결합**되는 이유이기도 하다 — 양쪽이 같은 함수 시그니처(proto 정의)를 공유해야 컴파일·동작이 가능하기 때문.

**관련:** [REST](rest.md) · [gRPC](grpc.md) · [Protocol Buffers](protocol-buffers.md)
**처음 나온 노트:** [AWS — gRPC vs REST](../reviews/2026-09-22-aws-grpc-rest.md)
