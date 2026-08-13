# 프론트엔드 상태 관리 — Redux, Zustand, Jotai

셋 모두 여러 컴포넌트가 공유하는 상태를 관리하지만 상태를 조직하고 변경하는 모델이 다르다.

| 도구 | 중심 모델 | 성격 |
|---|---|---|
| Redux | action → middleware → reducer → state | 변경 경로가 명시적이고 추적하기 좋지만 연결 코드가 늘 수 있다 |
| Zustand | 작은 store의 `get/set`과 action | 외부에서도 상태를 동기적으로 읽고 바꾸기 쉽다 |
| Jotai | 작은 atom과 atom의 의존 관계 | 상태와 파생 상태를 세밀하게 조합한다 |

RxJS는 이들과 같은 상태 저장소가 아니다. 시간에 따른 이벤트와 비동기 실행 흐름을 다룬다. 따라서 `RxJS가 Redux를 대체했다`보다 **RxJS가 실행 순서·취소·완료를 맡고 Zustand가 상태 보관을 맡았다**고 구분하는 편이 정확하다.

**관련:** [RxJS](rxjs.md) · [미들웨어](middleware.md)
**나온 곳:** [채널톡 RxJS 사이드 이펙트](../reviews/2026-08-13-channel-rxjs-side-effects.md)
