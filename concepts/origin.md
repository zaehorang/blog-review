# origin — 두 가지 뜻

같은 단어가 완전히 다른 두 개념을 가리킨다. 헷갈리기 쉬운 지점.

| | 보안의 origin | CDN의 origin server |
|---|---|---|
| 정체 | **프로토콜 + 도메인 + 포트** | **원본 저장소** (예: S3) |
| 쓰이는 곳 | CSRF·SameSite·CORS 판단 기준 | 엣지 캐시 미스 시 가져올 곳 |
| 판단 주체 | 브라우저 / 서버가 요청 헤더로 | CDN 엣지 |

DNS→엣지 라우팅([CDN](cdn.md))과 [CSRF](csrf.md)의 origin 검증(서버가 요청 헤더 판단)은 **서로 무관한 별개 시스템**이다.

**관련:** [CDN](cdn.md) · [CSRF](csrf.md)
**나온 곳:** [올리브영 Vue Web Components](../reviews/2026-08-04-oliveyoung-vue-web-components.md)
