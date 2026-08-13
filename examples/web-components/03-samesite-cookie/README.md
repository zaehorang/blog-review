# 03. SameSite 쿠키 차단 (iframe이 죽은 진짜 이유)

> 어느 리뷰에서: [`../../../reviews/2026-08-04-oliveyoung-vue-web-components.md`](../../../reviews/2026-08-04-oliveyoung-vue-web-components.md)

## 확인하는 것
iframe이 부모의 로그인 쿠키를 못 받는 것을 직접 재현. `iframe`은 "보안/인증 및 세션 공유 차단"으로 탈락한 대안이었는데, 그 메커니즘을 눈으로 확인.

## 실행
```bash
node server.js
```

## 순서
1. http://localhost:5601/login 방문 → 쿠키 심어짐.
2. http://localhost:5601/profile 직접 방문 → **✅ 로그인됨** (같은 사이트에서 쓰는 정상 케이스).
3. http://localhost:5602 방문 → 안의 iframe(Origin A의 /profile)을 확인 → **❌ 쿠키 없음** — 같은 브라우저, 같은 로그인 상태인데도 iframe 안에서는 쿠키가 안 실려감.

## 왜
`Set-Cookie`에 `SameSite=Strict`를 걸어뒀기 때문. Strict 쿠키는 **다른 사이트(origin)에서 시작된 요청에는 절대 실리지 않음** — iframe으로 불러오는 것도 여기 해당. 이게 정확히 리뷰에서 말한 "iframe은 SameSite 때문에 세션 공유가 안 된다"의 실물.
