# JSON-RPC

"원격 함수 호출"을 **JSON으로 표현하는 규격**(JSON-RPC 2.0). 프레임워크가 아니라 메시지 형식 약속이고, **전송 방식은 규정하지 않는다**(보통 [HTTP](http.md) 위, 웹소켓이나 stdio 위에서도 쓴다).

```json
{"jsonrpc": "2.0", "method": "getUser", "params": {"id": 1}, "id": 7}
```

- 요청은 `method` / `params` / `id`, 응답은 `result` 또는 `error`와 같은 `id`.
- 사람이 읽기 쉽고 단순하지만, 스키마 정의·코드 생성·스트리밍은 규격에 없다.

## RPC 계열 안에서의 위치

| | 정체 | 직렬화 | 전송 |
|---|---|---|---|
| [HTTP](http.md) | 요청/응답 전송 프로토콜 ([REST](rest.md)는 그 위의 설계 스타일) | 자유 (보통 JSON) | 자기 자신 (TCP 위) |
| **JSON-RPC** | [RPC](rpc.md)를 JSON으로 하는 **규격** | JSON | 규정 없음 |
| [gRPC](grpc.md) | RPC **프레임워크** (규격 + 코드 생성 + 스트리밍) | [Protobuf](protocol-buffers.md) (이진) | HTTP/2 |

세 개는 **같은 층위가 아니다.** HTTP는 길, JSON-RPC는 말하는 규칙, gRPC는 규칙과 길과 통역사(코드 생성)를 묶은 세트로 보면 된다.

**관련:** [RPC](rpc.md) · [gRPC](grpc.md) · [HTTP](http.md) · [REST](rest.md) · [MCP](mcp.md) (JSON-RPC 2.0 기반 프로토콜)
**처음 나온 노트:** [뱅크샐러드 — AI 코딩 시대 DDD](../reviews/2026-10-19-banksalad-ddd-ai-era.md)
