# CORS

**[출처(origin)](origin.md) = 프로토콜 + 호스트 + 포트.** 하나라도 다르면 다른 출처다. `localhost:3000`(프론트)과 `localhost:8000`(API)은 **포트가 달라** 다른 출처.

브라우저의 기본 보안 규칙(Same-Origin Policy)은 **다른 출처 서버의 응답을 내 JS가 읽지 못하게** 막는다. **CORS는 이 막힘을 푸는 규약**이다 — API 서버가 응답 헤더(`Access-Control-Allow-Origin: http://localhost:3000`)로 "이 출처는 읽어도 된다"고 알려주면 브라우저가 허용한다.

헷갈리기 쉬운 지점:
- **브라우저만의 규칙이다.** curl이나 서버끼리 통신에는 CORS가 없다.
- 요청은 서버에 **도착한다.** 막히는 건 **응답을 JS에게 주는 것**.
- 복잡한 요청(커스텀 헤더, `PUT` 등)은 먼저 `OPTIONS` 사전 확인(preflight)을 보낸다.

## 앞단과의 연결

[리버스 프록시](reverse-proxy.md)로 web·api를 **한 주소**(`example.com/`, `example.com/api`)에 묶으면 브라우저 입장에서 **같은 출처**가 돼 CORS 설정 자체가 필요 없다. 프론트엔드 개발자에게 앞단 게이트웨이의 이득이 가장 체감되는 곳.

**관련:** [origin](origin.md) · [CSRF](csrf.md) · [리버스 프록시](reverse-proxy.md)
**처음 나온 노트:** [이랜서 — Nginx 앞단](../reviews/2026-11-11-elancer-nginx-reverse-proxy.md)
