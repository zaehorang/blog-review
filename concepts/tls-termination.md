# HTTPS와 TLS 종료

**HTTPS = HTTP + TLS.** HTTP 내용을 암호화하고, 인증서로 서버가 진짜임을 증명한다. ([TCP](tcp-vs-udp.md) 연결 위에서 TLS 협상 → 그 위에 [HTTP](http.md))

암호화된 채로는 중간에서 **경로·호스트를 읽을 수 없다.** L7 라우팅을 하려면 누군가 한 곳에서 풀어야 하고, 이걸 **TLS 종료(termination)**라고 한다 — "앞단이 HTTPS를 처리한다"의 정체.

```
브라우저 ══(HTTPS, 암호화)══▶ Nginx ──(HTTP, 평문)──▶ 내부 앱 서버
                          여기서 풀림
```

한 곳에서 처리하는 이유:
- **인증서 관리**가 한 곳으로 모인다(앱마다 달 필요 없음)
- 앱 서버가 **암호화 연산**을 안 한다
- 풀린 뒤에야 [L7 라우팅](network-layers.md)이 가능하다

**대가:** 내부 구간이 **평문**이다 — 내부망을 신뢰한다는 전제. 그 구간도 막으려면 다시 암호화(re-encrypt)해야 한다.

**부작용:** 앱은 앞에서 https였다는 걸 **모른다**(평문 http로 받았으니). 이게 [리다이렉트 루프](http-redirect.md)의 원인 → 앞단이 `X-Forwarded-Proto: https`로 알려줘야 한다.

**관련:** [리버스 프록시](reverse-proxy.md) · [네트워크 계층](network-layers.md) · [HTTP 리다이렉트](http-redirect.md)
**처음 나온 노트:** [이랜서 — Nginx 앞단](../reviews/2026-11-11-elancer-nginx-reverse-proxy.md)
