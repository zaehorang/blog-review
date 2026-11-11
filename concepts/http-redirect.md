# HTTP 리다이렉트와 리다이렉트 루프

**리다이렉트**: 서버가 "여기가 아니라 저기로 가"라고 응답한다. `301`(영구)/`302`(임시) + `Location: 새 주소` 헤더 → 브라우저가 그 주소로 **자동으로 다시 요청**한다. 정상 쓰임: `http://` 접속자를 `https://`로 보내기.

**루프**: A가 B로 보내고 B가 다시 A로 보내서 끝없이 돈다. 브라우저는 일정 횟수 반복하면 포기하고 `ERR_TOO_MANY_REDIRECTS`를 띄운다.

## 앞단 + HTTPS에서 생기는 전형적 루프

```
① 브라우저 → http://a.com   → Nginx: "https로 가라" (301)
② 브라우저 → https://a.com  → Nginx가 [TLS를 풀고](tls-termination.md) 앱에 'http'로 전달
③ 앱: "http로 왔네? https로 가라" (301)   ← 앱은 원래 https였던 걸 모른다
④ 브라우저 → https://a.com 다시 → ②로 돌아감 … 반복
```

핵심은 ③ — **앱이 받은 요청은 평문 http라서 원래 https였는지 알 수 없다.**

- **해결:** Nginx가 `X-Forwarded-Proto: https`를 붙여 알려주고, 앱이 그 헤더를 믿어 리다이렉트를 건너뛴다.
- **다른 원인:** Nginx와 앱이 **둘 다** 같은 리다이렉트를 한다 · `proxy_pass`의 슬래시 처리로 경로가 의도치 않게 바뀐다.
- **진단 모양:** 브라우저 개발자도구에서 같은 두 주소가 번갈아 301로 찍힌다.

**관련:** [TLS 종료](tls-termination.md) · [리버스 프록시](reverse-proxy.md) · [HTTP](http.md)
**처음 나온 노트:** [이랜서 — Nginx 앞단](../reviews/2026-11-11-elancer-nginx-reverse-proxy.md)
