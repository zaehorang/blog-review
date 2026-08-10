# 미션 2 — 체크는 실패해도 변환은 성공한다

> 어느 리뷰에서: [`../../../reviews/2026-08-05-nextree-typescript.md`](../../../reviews/2026-08-05-nextree-typescript.md)

`mission.ts`엔 일부러 타입 에러(`double("5")`)가 있다. 대화에서 나온 "타입 에러가 있어도 tsc는 기본적으로 JS를 emit한다"를 직접 확인한다.

## 예상해보기
- `tsc mission.ts`를 실행하면 에러 메시지가 뜰까? `.js` 파일도 같이 생성될까?
- 생성된 `.js`를 `node`로 실행하면 뭐가 나올까? (힌트: JS는 문자열에 `* 2`를 하면 자동 형변환을 시도한다)

## 실행
```bash
# 1) 기본 동작 — 에러가 나면서도 .js가 생기는지 확인
tsc mission.ts --strict
ls mission.js          # 생겼는지 확인
node mission.js         # 실행 결과 확인

# 2) 에러가 있으면 emit 자체를 막아보기
rm mission.js
tsc mission.ts --strict --noEmitOnError
ls mission.js          # 이번엔 안 생겼는지 확인
```

## 확인할 포인트
1번에서 tsc가 에러 메시지를 출력하면서도 `mission.js`를 만들어냈다면, 그게 "체크 실패 ≠ 변환 실패"라는 것. `node mission.js`의 실행 결과도 확인해보자 — 타입 에러가 조용히 숫자 아닌 값으로 계산돼버린 걸 눈으로 볼 수 있다.

2번(`--noEmitOnError`)에서는 `.js`가 안 생기는 걸 확인하면 끝. 이게 실무에서 "빌드를 막고 싶을 때" 켜는 옵션이다 — 기본값이 아니라는 게 핵심.
