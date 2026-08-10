# WebSocket

## TCP "대신"이 아니라 TCP "위에서"

HTTP 연결을 **업그레이드**해서 만드는 지속 연결. 그래서 올바른 구도는 "TCP vs WebSocket"이 아니라 **"HTTP 요청/응답 vs WebSocket 지속연결"**이다.

## 쓰는 1순위 이유는 server push

흔한 오해: "매번 인증/연결하는 비용을 아끼려고."
→ 비용 절감은 **부차적**이다. 진짜 이유는 **서버가 먼저 말을 걸 수 있다**는 것. HTTP는 서버가 먼저 못 말 걸어서 polling해야 한다. "남이 보낸 메시지가 즉시 도착"이 정확히 이걸 요구한다.

## 인증은 연결할 때 1회

메시지마다 재인증하지 않는다. handshake에 토큰을 실어 검증하고, 이후엔 **"열린 연결 자체가 신분증"**이다. 그게 "빠르다"의 정체.

**관련:** [이벤트 알림 vs 푸시 알림](event-vs-push-notification.md)
**나온 곳:** [Nextree WebSocket 채팅](../reviews/2026-07-30-nextree-websocket-chat.md)
