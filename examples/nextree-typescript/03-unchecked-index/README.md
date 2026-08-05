# 미션 3 — 배열 범위 초과, 컴파일 타임에 잡기

`numbers[5]`는 존재하지 않는 인덱스인데, TS는 기본적으로 이걸 그냥 `number` 타입으로 인식한다(`undefined`일 수 있다는 걸 타입에 반영 안 함).

## 예상해보기
- `tsc mission.ts --strict --noEmit`을 돌리면 에러가 날까?
- 그대로 `node`로 실행하면 무슨 일이 생길까?

## 실행
```bash
# 1) 기본 strict 모드 — 컴파일 타임에 잡히는지 확인
tsc mission.ts --strict --noEmit

# 2) 진짜 실행해서 런타임에 터지는지 확인
tsc mission.ts --strict
node mission.js

# 3) noUncheckedIndexedAccess를 켜서 다시 컴파일 타임 체크
tsc mission.ts --strict --noEmit --noUncheckedIndexedAccess
```

## 확인할 포인트
1번은 통과할 것이다(에러 없음) — `strict: true`도 이 케이스는 못 잡는다는 뜻. 2번에서 `node`가 뭐라고 하면서 죽는지 읽어보자(`Cannot read properties of undefined ...` 같은 메시지가 나올 것이다). 3번에서는 반대로 컴파일 타임에 에러가 나야 한다 — `fourth`의 타입이 `number`가 아니라 `number | undefined`로 바뀌었기 때문.

## 다음 미션: 고쳐보기
3번의 에러를 없애려면 `fourth`가 `undefined`일 수 있다는 걸 코드에서 인정해야 한다. `mission.ts`를 직접 고쳐서(옵셔널 체이닝 `?.` 또는 `if (fourth !== undefined)` 가드 등) 3번 명령이 에러 없이 통과하게 만들어보자.
