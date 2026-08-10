# 오브젝트 스토리지

파일을 "오브젝트"(데이터 + 메타데이터 + 고유 키) 단위로 저장하는 스토리지. 파일시스템처럼 디렉토리 트리를 흉내 내지만 실제론 평평한 키-값 저장소다.

**S3는 AWS 고유 상품명**이지 일반 개념어가 아니다. 같은 것을 각 클라우드가 다르게 부른다:

| AWS | GCP | Azure |
|---|---|---|
| S3 | GCS (Cloud Storage) | Blob Storage |

정적 산출물(JS 번들·이미지)을 여기 올리고 [CDN](cdn.md)의 오리진으로 두는 게 흔한 배포 구성.

**관련:** [CDN](cdn.md) · [origin](origin.md)
**나온 곳:** [올리브영 Vue Web Components](../reviews/2026-08-04-oliveyoung-vue-web-components.md)
