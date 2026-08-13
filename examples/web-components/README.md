# 웹 컴포넌트 실습 랩

> 어느 리뷰에서 왔나: [`../../reviews/2026-08-04-oliveyoung-vue-web-components.md`](../../reviews/2026-08-04-oliveyoung-vue-web-components.md)
> 원문: https://oliveyoung.tech/2026-07-14/building-integrated-backoffice-with-vue-web-components/

리뷰 중 교정된 개념 7개를 손으로 만져서 눈으로 확인하는 실습 모음.
**의존성 0개** — Node 내장 `http` 모듈만 사용, Vue는 브라우저에서 CDN(`unpkg`)으로 직접 로드. `npm install` 불필요.

각 폴더의 README를 보고 순서대로 실행하면 됩니다.

| # | 폴더 | 확인하는 것 |
|---|------|------------|
| 1 | [`01-shadow-dom/`](./01-shadow-dom/) | 전역 CSS가 Shadow DOM 안으로 안 새는 것 + 수동 스타일 주입 |
| 2 | [`02-same-memory-vs-iframe/`](./02-same-memory-vs-iframe/) | 살아있는 함수 참조 — 웹 컴포넌트는 되고 iframe(cross-origin)은 안 되는 것 |
| 3 | [`03-samesite-cookie/`](./03-samesite-cookie/) | iframe이 SameSite 쿠키를 못 받는 것 (iframe이 탈락한 진짜 이유) |
| 4 | [`04-cdn-cache-busting/`](./04-cdn-cache-busting/) | CDN 캐시가 재배포 후에도 옛 버전을 물고 있는 것 + 캐시버스팅 |
| 5 | [`05-csrf/`](./05-csrf/) | CSRF 공격 성공 → 토큰 검증으로 방어 (교육용, localhost 전용) |
| 6 | [`06-structural-security/`](./06-structural-security/) | CDN 파일 자체엔 비밀이 없어서 훔쳐가도 무용지물인 것 |
| 7 | [`07-ssr-vs-csr/`](./07-ssr-vs-csr/) | CSR은 빈 껍데기, SSR은 완성된 HTML — 크롤러 시점 |

## 실행 방법 요약
- **파일만 열면 되는 것** (1, 6): `open index.html` 또는 더블클릭.
- **정적 서버 두 포트 필요** (2): `node ../serve.js <port> <dir>` 두 번.
- **자체 서버 있는 것** (3, 4, 5, 7): 각 폴더에서 `node server.js` (또는 5번은 `bank-server.js` + `attacker-server.js`).

포트 겹침 없이 각 폴더가 독립적으로 동작하도록 서로 다른 포트 대역을 씁니다(5501~5502, 5601~5602, 5701, 5801~5802, 5901). 다 쓴 서버는 터미널에서 Ctrl+C로 끄고 다음 걸로 넘어가세요.
