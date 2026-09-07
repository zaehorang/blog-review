# 번들러 (Bundler)

브라우저는 `import`, JSX(`<div/>`), TypeScript를 그대로 못 읽는다. **번들러** = 이걸 브라우저가 읽는 순수 JS로 변환(transpile) + 여러 파일을 묶기(bundle).

| 도구 | 언어 | 속도 | 특징 | 언제 |
|---|---|---|---|---|
| **webpack** | JS | 느림 | 가장 오래됨. 플러그인 생태계 최강, 뭐든 됨. 설정 복잡 | 크고 특수 요구 많은 프로젝트 |
| **Vite** | JS + esbuild + Rollup | 빠름 | 개발 땐 esbuild로, 배포 빌드는 Rollup으로. 요즘 새 프로젝트 표준 | 대부분 |
| **Rollup** | JS | 중간 | 라이브러리 빌드에 강함(깔끔한 결과물) | npm에 배포할 패키지 |
| **esbuild** | **Go** | 매우 빠름 (10~100배) | 병렬처리 잘됨. 대신 기능 최소한 — 코드 분할·일부 최적화 약함 | 속도 최우선, 단순 번들 |
| **Turbopack / Rspack** | **Rust** | 매우 빠름 | webpack을 Rust로 재작성한 차세대. 성숙 중 | Next.js 등 |

## esbuild vs Vite/webpack
- **esbuild = 엔진.** 순수 변환·번들만, 초고속. Go로 작성 → 브라우저에서 돌리려고 [WebAssembly](webassembly.md)로 포팅한 게 `esbuild-wasm`.
- **Vite/webpack = 완제품.** 개발 서버, HMR, 최적화, 플러그인 포함. 내부적으로 esbuild를 부품으로 쓰기도 함.

## 트레이드오프의 축: 속도 vs 기능
- **자주 + 급하게** (사용자가 기다림) → 빠른 도구 (esbuild)
- **가끔 + 정확하게** (한 번 만들어두고 재사용) → 기능 많은 도구 (Vite/webpack)

토스 TOI가 정확히 이렇게 나눔 — 브라우저 안 실시간 번들은 `esbuild-wasm`, 패키지 사전 빌드는 Yarn+Vite.

**관련:** [패키지 매니저와 lockfile](package-manager-lockfile.md) · [import map](import-map.md) · [WebAssembly](webassembly.md) · [컴파일러 파이프라인](compiler-pipeline.md) · [증분 빌드](incremental-build.md)
**나온 곳:** [토스 AI 코드 Preview Runtime](../reviews/2026-09-07-toss-ai-code-preview-runtime.md)
