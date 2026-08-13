# CSRF (Cross-Site Request Forgery)

공격의 정체는 **"로그인된 사이트의 쿠키가 악성사이트발 요청에도 자동으로 실린다"**는 것.

```
사용자가 bank.com에 로그인 (쿠키 보유)
   └→ evil.com 방문
        └→ evil.com이 bank.com/transfer 로 요청
             └→ 브라우저가 bank.com 쿠키를 자동으로 붙임 → 서버는 정상 요청으로 봄
```

## 방어

- **CSRF 토큰** — 악성사이트는 그 값을 못 읽는다 (읽으려면 동일 [origin](origin.md)이어야 함)
- **Origin/Referer 헤더 검증** — 서버가 "이 요청 어디서 왔나"를 확인
- **SameSite 쿠키** — 브라우저가 크로스사이트 요청에 쿠키를 안 싣게 함

**관련:** [origin](origin.md)
**나온 곳:** [올리브영 Vue Web Components](../reviews/2026-08-04-oliveyoung-vue-web-components.md) · [실습](../examples/web-components/05-csrf/)
