# 타입스크립트 핵심 동작 실습 미션

> 어느 리뷰에서 왔나: [`../../reviews/2026-08-05-nextree-typescript.md`](../../reviews/2026-08-05-nextree-typescript.md)
> 원문: https://www.nextree.io/taibseukeuribteu-typescript-pahecigi/

리뷰에서 나온 개념 4개를 직접 코드로 건드려서 확인하는 미션 모음.
**의존성 0개** — 전역 설치된 `tsc`만 사용, `npm install` 불필요. (`tsc --version`으로 설치 확인. 없으면 `npm install -g typescript` 한 번만.)

| # | 폴더 | 확인하는 것 |
|---|------|------------|
| 1 | [`01-structural-typing/`](./01-structural-typing/) | 구조적 타이핑의 함정 — 객체 리터럴 직접 전달 vs 변수 경유 |
| 2 | [`02-emit-vs-check/`](./02-emit-vs-check/) | 타입 에러가 있어도 JS가 emit되는 것 + `noEmitOnError`로 막아보기 |
| 3 | [`03-unchecked-index/`](./03-unchecked-index/) | 배열 범위 초과 접근이 런타임에서만 터지는 것 → `noUncheckedIndexedAccess`로 컴파일 타임에 잡기 |
| 4 | [`04-type-assertion/`](./04-type-assertion/) | `as`가 컴파일러를 어떻게 속이는지, `as const`는 왜 안전한지 |
| 5 | [`05-real-project-structure/`](./05-real-project-structure/) | (참고용) `outDir`로 소스·결과물 분리 + `import`/`export` 모듈 — 미션 2에서 겪은 "소스 옆에 .js 남아서 충돌" 문제를 실무는 어떻게 피하는지 |

## 미션 진행 방식
각 폴더 README에 **"예상해보기 → 실행 → 확인"** 순서로 미션이 있음. 코드를 열어보기 전에 먼저 결과를 예상해보고, 그다음 명령어를 실행해서 맞았는지 확인하는 게 포인트 — 틀렸다면 그게 오늘의 교정.

## 공통 실행법
설치 없이 파일 하나씩 이렇게 직접 컴파일:
```bash
tsc <파일경로> --strict --noEmit   # 타입 체크만, JS 생성 안 함
tsc <파일경로> --strict            # 같은 위치에 .js 생성 → node로 실행
```

`tsconfig.json`은 일부러 안 둠 — 미션마다 flag를 커맨드라인에서 바로 켰다 껐다 비교하는 게 핵심이라, config 파일에 넣으면 매번 파일을 고쳐야 해서 번거로움(설치된 TS 7.x는 파일 경로를 직접 넘길 때 tsconfig가 있으면 `--ignoreConfig`를 요구하기도 함).
