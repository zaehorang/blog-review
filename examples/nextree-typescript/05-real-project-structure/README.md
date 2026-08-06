# 미션 5 — 실제 프로젝트라면 이렇게 구조를 짠다

미션 2에서 겪은 문제(`mission.ts` 옆에 `mission.js`가 남아서 에디터가 "변수 중복 선언"이라고 헷갈린 것)를 실무는 어떻게 피하는지 보여주는 예시. 미션이라기보다 **참고용 구조**에 가까움.

## 구조
```
05-real-project-structure/
  tsconfig.json    ← outDir로 결과물 위치를 분리
  .gitignore       ← dist/는 커밋 안 함(빌드 산출물이니까)
  src/
    math.ts        ← export가 있는 진짜 "모듈"
    index.ts       ← math.ts를 import해서 사용
  dist/            ← tsc가 만들어냄 (실행 전엔 없음)
```

## 실행
```bash
tsc              # 파일 지정 안 함 → tsconfig.json을 자동으로 읽어서 프로젝트 전체 빌드
ls dist/          # index.js, math.js가 여기 생김 — src/엔 안 생김
node dist/index.js
```

## 이전 미션들과 다른 점 두 가지

**① `outDir`로 소스와 결과물을 분리.** `tsconfig.json`의 `"rootDir": "./src"`, `"outDir": "./dist"`가 핵심 — `src/math.ts`를 컴파일하면 `dist/math.js`로 감. 소스 폴더엔 `.js`가 절대 안 생기니까, 미션 2 폴더에서 겪었던 "같은 폴더에 `.ts`, `.js`가 나란히 있어서 충돌" 자체가 구조적으로 불가능해짐.

**② `import`/`export`가 있는 진짜 모듈.** `math.ts`가 `export function double`을 쓰고, `index.ts`가 `import { double } from "./math"`로 가져다 씀. 이렇게 하나라도 `import`/`export`가 있으면 그 파일은 "전역 스크립트"가 아니라 독립된 스코프를 가진 "모듈"이 됨 — 그래서 설령 결과물이 근처에 있어도 지금까지 본 것 같은 전역 변수 충돌이 안 생김.

## 참고: 여기서도 `tsc`는 여전히 "체크 겸 변환"
`tsc`를 그냥 돌리면 타입 에러가 있어도 `dist/`에 JS는 여전히 나옴(미션 2에서 본 그 동작 그대로). 실무에서 정말 안전하게 하려면 `tsconfig.json`에 `"noEmit": true`를 추가하고, `tsc --noEmit`은 타입 체크 전용으로만 CI에서 돌리고, 실제 실행 파일은 esbuild/swc 같은 번들러가 따로 만드는 구성이 흔함 — 그것까진 여기서 다루지 않고 구조만 보여주는 선에서 끝.
