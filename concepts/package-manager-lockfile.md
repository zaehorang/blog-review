# 패키지 매니저와 lockfile

**패키지 매니저** (npm, yarn, pnpm) = 남이 만든 코드(패키지)를 레지스트리(npm registry)에서 받아오고 버전을 관리하는 도구. yarn/pnpm은 npm의 대안 — 더 빠르고 lock이 엄격.

세 파일의 역할:

| 파일 | 누가 쓰나 | 내용 |
|---|---|---|
| `package.json` | 사람 | "이 프로젝트가 뭘 필요로 하나" **선언**. `"react": "^18.2.0"` 처럼 **범위**로 적음 (`^18` = 18.x 중 최신 허용) |
| `node_modules/` | 매니저 (자동) | 실제 다운로드된 코드. 내가 적은 것 + 그게 의존하는 것 + 또 그게 의존하는 것 = **의존성 트리를 전부 펼친 결과**. 수백 MB |
| `yarn.lock` / `package-lock.json` | 매니저 (자동) | "이번에 정확히 몇 버전을 깔았나"의 **스냅샷**. 사람이 안 건드림 |

## 왜 lock이 따로 필요한가 — 재현성

`package.json`은 범위라서, 오늘 설치하면 18.2.0, 다음 달엔 18.3.0이 깔릴 수 있다. lock은 정확한 버전 + 무결성 해시를 못박아서 **팀원 전체 · CI · 서버가 똑같은 의존성을 재현**하게 한다. lock이 없으면 "내 컴퓨터에선 되는데" 가 생긴다.

## 브라우저엔 이게 없다
`node_modules` 폴더도 파일시스템도 없다. 그래서 브라우저에서 코드를 실행하려면 의존성을 [번들러](bundler.md)로 미리 묶거나 [import map](import-map.md)으로 URL에 연결해야 한다.

**관련:** [번들러](bundler.md) · [import map](import-map.md) · [내용 주소화](content-addressing.md) · [모노레포](monorepo.md)
**나온 곳:** [토스 AI 코드 Preview Runtime](../reviews/2026-09-07-toss-ai-code-preview-runtime.md)
