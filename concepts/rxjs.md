# RxJS

클릭, 네트워크 응답, 소켓 메시지처럼 **시간에 따라 발생하는 값**을 Observable 스트림으로 보고 조합·변환·취소하는 JavaScript 라이브러리다.

## 완료는 자동으로 정해지지 않는다

스트림에는 `next`, `error`, `complete` 신호가 있지만, 무엇을 전체 작업의 `complete`로 볼지는 설계자가 정한다. API 응답 뒤에 소켓 연결과 인증이 이어진다면 API 응답만으로 전체 스트림을 끝내면 안 된다.

소켓 메시지처럼 계속 살아 있는 스트림은 자연스럽게 complete되지 않을 수도 있다. 이때는 장기 구독을 별도 스트림으로 분리하고, `shutdown` 같은 생명주기 경계에서 구독을 해제해야 한다.

## 연산자는 동시성 정책이다

- `concatMap`: 이전 작업이 complete될 때까지 다음 작업을 대기
- `mergeMap`: 여러 작업의 병렬 실행 허용
- `switchMap`: 새 작업이 오면 이전 구독을 취소하고 전환
- `exhaustMap`: 현재 작업 중 들어온 새 작업을 무시

좋고 나쁜 선택이 미리 정해진 것이 아니라, 인터페이스가 약속한 순서·취소 정책에 맞춰 고른다.

## Swift와 비교

Combine의 `Publisher`가 가장 가까운 반응형 스트림 모델이다. `AsyncStream`은 지속적인 비동기 값을 `AsyncSequence`로 소비하게 해주는 기본 도구에 가깝고, structured concurrency는 `Task`의 부모·자식 관계와 취소 범위를 구조화한다.

**관련:** [WebSocket](websocket.md) · [미들웨어](middleware.md)
**나온 곳:** [채널톡 RxJS 사이드 이펙트](../reviews/2026-08-13-channel-rxjs-side-effects.md)
