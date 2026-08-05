# 미션 4 — `as`가 컴파일러를 속이는 법, 그리고 속이지 않는 법

`mission.ts`에 두 종류의 `as`가 있다: 위험한 것(`any`를 거쳐 진짜 문자열을 number로 우기기)과 안전한 것(`as const`로 타입을 좁히기).

## 예상해보기
- 위: `raw as number`는 `tsc`를 통과할까? 통과한다면 왜(any는 뭐든 될 수 있다는 걸 떠올려보기), `node`로 실행하면 무슨 일이 생길까?
- 아래: `request(method1)`과 `request(method2)` 중 어느 쪽이 컴파일 에러가 날까? 왜 `as const`를 붙인 쪽이 오히려 더 잘 통과할까?

## 실행
```bash
# 위험한 as — 컴파일은 통과하는지, 실행하면 어떻게 되는지
tsc mission.ts --strict --noEmit   # 에러 없이 통과하는지 확인
tsc mission.ts --strict
node mission.js                     # 여기서 크래시 나는 걸 확인

# request(method1) 줄을 주석 처리하고 다시 컴파일하면?
# 반대로 request(method2) 줄만 남기면?
```

## 확인할 포인트
- `raw as number`는 `any`를 거쳐서 갔기 때문에 TS가 검사할 방법이 없다 — 컴파일은 조용히 통과하고, `node`로 실행하는 순간에야 "문자열엔 `toFixed`가 없다"는 사실이 드러난다. 이게 `as`의 위험한 얼굴.
- `method1`(그냥 `"GET"`)은 타입이 `string`으로 넓게 추론돼서 `Method`(`"GET" | "POST"`)에 안 맞아 컴파일 에러가 난다. `method2`(`"GET" as const`)는 타입이 정확히 `"GET"`이라는 리터럴로 좁혀져서 `Method`에 자연스럽게 맞는다. 같은 `as`라도 하나는 "타입을 속이는" 용도고, 다른 하나는 "타입을 더 정확하게 만드는" 용도라는 걸 직접 비교해서 확인하는 미션.
