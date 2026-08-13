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
  return defer(() => {
    log(`[boot ${name}] API 요청`);

    return timer(apiDelay).pipe(
      tap(() => {
        state.sessionJWT = `jwt-${name}`;
        log(`[boot ${name}] API 응답, JWT 저장`);
        log(`[socket ${name}] gateway 주소 조회 + 연결 시작`);
      }),
      concatMap(() => timer(80)),
      tap(() => {
        if (!state.sessionJWT) {
          throw new Error(`[socket ${name}] JWT 없음`);
        }
        state.socketOwner = name;
        log(`[socket ${name}] authenticate 성공`);
      }),
      tap({ complete: () => log(`[boot ${name}] complete`) }),
    );
  });
}

function shutdown$() {
  return defer(() => {
    log('[shutdown] JWT/store/socket와 실행 리소스 정리');
    state.sessionJWT = null;
    state.socketOwner = null;
    return of(null).pipe(
      tap({ complete: () => log('[shutdown] complete') }),
    );
  });
}

const commands$ = new Subject();

console.log('\n=== RxJS 구조: 실제 complete까지 기다려 직렬화 ===');

const finished = new Promise((resolve, reject) => {
  commands$
    .pipe(
      // 각 command의 inner Observable이 complete된 뒤 다음 command를 구독한다.
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

// 외부에서는 기다리지 않고 연달아 호출해도 내부 정책이 순서를 보장한다.
commands$.next({ type: 'boot', name: 'A', apiDelay: 20 });
commands$.next({ type: 'shutdown' });
commands$.next({ type: 'boot', name: 'B', apiDelay: 140 });
commands$.complete();

await finished;
log('[command queue] complete');
