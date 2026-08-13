# 미들웨어 (Middleware)

입력과 최종 처리자 사이에 끼어 흐름을 관찰하거나 확장하는 계층이다.

```text
입력 → 미들웨어 A → 미들웨어 B → 최종 처리
```

서버에서는 인증·로깅·에러 처리가 흔한 예다. Redux에서는 `dispatch(action)`과 reducer 사이에서 액션을 가로채 비동기 요청, 로깅 같은 사이드 이펙트를 수행한다.

`redux-observable`은 Redux 미들웨어다. dispatch된 액션을 RxJS 스트림으로 받고, 이를 구독해 사이드 이펙트를 정의하는 단위를 epic이라 부른다.

**관련:** [RxJS](rxjs.md) · [프론트엔드 상태 관리](frontend-state-management.md)
**나온 곳:** [채널톡 RxJS 사이드 이펙트](../reviews/2026-08-13-channel-rxjs-side-effects.md)
