# 02. 같은 메모리(웹 컴포넌트) vs iframe

> 어느 리뷰에서: [`../../../reviews/2026-08-04-oliveyoung-vue-web-components.md`](../../../reviews/2026-08-04-oliveyoung-vue-web-components.md)

## 확인하는 것
"구조적 보안"의 핵심 원리 — 웹 컴포넌트는 부모와 **같은 JS 실행 컨텍스트**라 살아있는 함수/객체를 참조로 그대로 넘길 수 있지만, iframe(cross-origin)은 그게 막힌다는 것.

## 실행
터미널 두 개를 열어 각각 다른 포트로 정적 서버를 띄웁니다.

```bash
# 터미널 1 — 부모 페이지 (5501)
node ../serve.js 5501 ./parent

# 터미널 2 — iframe 안에 들어갈 child (5502)
node ../serve.js 5502 ./child
```

그 다음 브라우저로 http://localhost:5501 접속.

## 볼 것
1. **웹 컴포넌트 버튼**을 누르면 `✅ [인증됨] ...` 성공 메시지 — 부모의 함수가 참조 그대로 넘어가서 실행됨.
2. **iframe 로그**에는 `❌ 직접 대입 실패: SecurityError`가 뜸 — 다른 origin의 `window`에 함부로 값을 못 심음(Same-Origin Policy).
3. 그 아래 `postMessage로 함수 전달 시도` 부분도 실패 — 함수는 구조적 복제(structured clone)가 안 되는 값이라, cross-origin 간엔 직렬화 가능한 데이터만 오갈 수 있음.

→ 이게 "CDN 파일을 훔쳐도 무용지물"이 되는 이유의 반쪽(나머지 반쪽은 06번 참고): 애초에 살아있는 인증 객체를 cross-origin으로 빼돌릴 방법 자체가 브라우저 수준에서 막혀 있음.
