import {
  Subject,
  concatMap,
  defer,
  of,
  tap,
  timer,
} from 'rxjs';

const state = {
  sessionJWT: null,
  socketOwner: null,
};

const log = (message) => console.log(`${new Date().toISOString().slice(11, 23)} ${message}`);

function boot$(name, apiDelay) {
  // 함수 이름 뒤의 $는 "Observable을 반환한다"는 RxJS 관례다.
  // defer를 쓰면 boot$를 만드는 순간이 아니라 실제 구독 시점에 작업이 시작된다.
  return defer(() => {
    log(`[boot ${name}] API 요청`);

    return timer(apiDelay).pipe(
      // timer가 값을 내보낸 시점을 boot API 응답 시점으로 흉내 낸다.
      // tap은 스트림의 값을 바꾸지 않고 상태 변경·로깅 같은
      // 사이드 이펙트를 실행할 때 사용한다.
      tap(() => {
        state.sessionJWT = `jwt-${name}`;
        log(`[boot ${name}] API 응답, JWT 저장`);
        log(`[socket ${name}] gateway 주소 조회 + 연결 시작`);
      }),

      // API 응답 뒤에 소켓 연결이 끝날 때까지 80ms를 더 기다린다.
      // 이 inner Observable이 complete되기 전에는 아래 단계로 가지 않는다.
      concatMap(() => timer(80)),

      // 소켓 연결이 끝난 뒤 JWT로 authenticate한다.
      // 이 단계까지 boot$ 안에 들어 있으므로 API 응답만으로 complete되지 않는다.
      tap(() => {
        if (!state.sessionJWT) {
          throw new Error(`[socket ${name}] JWT 없음`);
        }
        state.socketOwner = name;
        log(`[socket ${name}] authenticate 성공`);
      }),

      // 위의 모든 단계가 정상적으로 끝난 뒤에야 boot 스트림이 complete된다.
      tap({ complete: () => log(`[boot ${name}] complete`) }),
    );
  });
}

function shutdown$() {
  // shutdown도 boot와 같은 하나의 작업 단위(Observable)로 표현한다.
  return defer(() => {
    log('[shutdown] JWT/store/socket와 실행 리소스 정리');
    state.sessionJWT = null;
    state.socketOwner = null;
    return of(null).pipe(
      tap({ complete: () => log('[shutdown] complete') }),
    );
  });
}

// 고객이 SDK의 공개 인터페이스를 호출할 때마다 command가 들어오는 큐다.
// Subject는 외부에서 next()로 값을 밀어 넣을 수 있는 Observable이다.
const commands$ = new Subject();

console.log('\n=== RxJS 구조: 실제 complete까지 기다려 직렬화 ===');

const finished = new Promise((resolve, reject) => {
  commands$
    .pipe(
      // 가장 중요한 부분:
      // 바깥 concatMap은 현재 command가 반환한 Observable이 complete될 때까지
      // 다음 command를 시작하지 않는다.
      //
      // 따라서 실행 순서는 아래처럼 고정된다.
      // Boot A 전체 complete → shutdown complete → Boot B 시작
      concatMap((command) =>
        command.type === 'boot'
          ? boot$(command.name, command.apiDelay)
          : shutdown$(),
      ),
    )
    .subscribe({
      error: reject,
      complete: resolve,
    });
});

// 고객 코드는 세 인터페이스를 기다리지 않고 빠르게 연속 호출할 수 있다.
// 그래도 위의 concatMap이 command를 순서대로 하나씩 실행한다.
commands$.next({ type: 'boot', name: 'A', apiDelay: 20 });
commands$.next({ type: 'shutdown' });
commands$.next({ type: 'boot', name: 'B', apiDelay: 140 });

// 더 들어올 command가 없음을 알린다.
// 이미 큐에 들어온 세 작업을 모두 처리해야 commands$ 전체가 complete된다.
commands$.complete();

// subscribe의 complete/error를 Promise로 감싸 Node 프로세스에서 기다린다.
await finished;
log('[command queue] complete');
