# 07. SSR vs CSR — 크롤러 시점

> 어느 리뷰에서: [`../../../reviews/2026-08-04-oliveyoung-vue-web-components.md`](../../../reviews/2026-08-04-oliveyoung-vue-web-components.md)

## 확인하는 것
원문의 "SSR/SEO보다는 로그인 이후 적용하기" 판단 근거 — CSR은 서버가 보내는 최초 HTML이 빈 껍데기라는 것.

## 실행
```bash
node server.js
```

## 방법 1 — 페이지 소스 보기 (브라우저가 "실행한 결과"가 아니라 서버가 "진짜로 보낸 것")
- http://localhost:5901/csr 에서 우클릭 → 페이지 소스 보기 → `<div id="app">불러오는 중...</div>` 만 보임.
- http://localhost:5901/ssr 에서 우클릭 → 페이지 소스 보기 → 상품명·가격이 **이미 HTML 안에** 들어있음.

## 방법 2 — JS 없는 상황(크롤러) 시뮬레이션
1. 개발자도구 열기 → Cmd+Shift+P(macOS) → "Disable JavaScript" 실행.
2. 두 URL을 새로고침.
3. `/csr`은 "불러오는 중..."에서 **영원히 멈춤**. `/ssr`은 정상적으로 다 보임.
4. 다시 "Enable JavaScript"로 되돌리는 것 잊지 말기.

## 결론
검색엔진 크롤러가 JS 실행을 안 하거나 타이밍을 놓치면 CSR 페이지는 빈 화면으로 읽힘 — 그래서 원문은 이 방식을 **공개 노출이 필요없는 "로그인 이후" 화면에만** 적용했음.
