# RxJS 사이드 이펙트 생명주기 실습

> 출처: [채널톡 — RxJS로 우아하게 사이드 이펙트 통제하기](../../reviews/2026-08-13-channel-rxjs-side-effects.md)

같은 `boot A → shutdown → boot B` 호출을 두 구조로 실행한다.

- `legacy-race.js`: boot API 응답을 전체 완료로 오판한다. 소켓 연결은 백그라운드에 남아 다음 `shutdown`과 충돌한다.
- `rxjs-serialized.js`: 호출을 스트림으로 만들고 `concatMap`으로 직렬화한다. 소켓 인증까지 끝난 뒤에야 각 boot 스트림이 `complete`된다.

## 실행

```bash
npm install
npm start
```

각 버전만 따로 실행할 수도 있다.

```bash
npm run bug
npm run fixed
```

## 봐야 할 로그

문제 구조에서는 첫 boot가 `reported complete`를 출력한 뒤 소켓 연결을 계속한다. 그 사이 shutdown이 토큰을 지워서 `[socket A] authenticate FAILED`가 발생한다.

RxJS 구조에서는 외부 호출 세 개를 한꺼번에 넣어도 다음 순서를 지킨다.

```text
boot A: API → socket connect → authenticate → complete
shutdown: token/socket 정리 → complete
boot B: API → socket connect → authenticate → complete
```

## 바꿔볼 것

`rxjs-serialized.js`의 `concatMap`을 아래 연산자로 바꾸고 로그를 비교한다.

- `mergeMap`: 이전 작업을 기다리지 않고 병렬 실행
- `switchMap`: 새 호출이 오면 이전 작업의 구독을 취소
- `exhaustMap`: 작업 중 들어온 새 호출을 무시

어떤 연산자가 더 좋은지가 아니라, 공개 인터페이스가 약속한 동시성 정책을 코드로 고르는 것이 목적이다.
