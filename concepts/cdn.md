# CDN

DNS가 사용자 위치 기준 **가장 가까운 엣지 IP**를 반환 → 엣지에 캐시가 없거나 만료(TTL)면 [오리진](origin.md)(S3 등)에서 가져와 서빙.

## 캐시 버스팅

재배포해도 옛 캐시가 남는 문제는 **콘텐츠 해시 파일명**으로 해결한다 (`app.a1b2c3.js`).

> URL 자체가 바뀌어 무조건 캐시 미스가 되게 하는 것 —
> **TTL을 우회하는 게 아니라, TTL을 신경 안 써도 되게 만드는 것.**

**관련:** [origin](origin.md) · [오브젝트 스토리지](object-storage.md)
**나온 곳:** [올리브영 Vue Web Components](../reviews/2026-08-04-oliveyoung-vue-web-components.md) · [실습](../examples/web-components/04-cdn-cache-busting/)
