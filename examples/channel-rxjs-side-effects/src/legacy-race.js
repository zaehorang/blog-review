const state = {
  sessionJWT: null,
  socketOwner: null,
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const log = (message) => console.log(`${new Date().toISOString().slice(11, 23)} ${message}`);

async function connectSocketInBackground(name) {
  log(`[socket ${name}] gateway 주소 조회 + 연결 시작`);
  await wait(80);

  if (!state.sessionJWT) {
    log(`[socket ${name}] authenticate FAILED: JWT가 shutdown에서 지워짐`);
    return;
  }

  state.socketOwner = name;
  log(`[socket ${name}] authenticate 성공 (현재 JWT=${state.sessionJWT})`);
}

async function legacyBoot(name, apiDelay) {
  log(`[boot ${name}] API 요청`);
  await wait(apiDelay);
  state.sessionJWT = `jwt-${name}`;
  log(`[boot ${name}] API 응답, JWT 저장`);

  // 문제: 후속 작업을 기다리지 않고 boot 완료를 외부에 알린다.
  void connectSocketInBackground(name);
  log(`[boot ${name}] reported complete (하지만 소켓은 아직 실행 중)`);
}

async function legacyShutdown() {
  log('[shutdown] JWT/store/socket 초기화');
  state.sessionJWT = null;
  state.socketOwner = null;
}

console.log('\n=== 문제 구조: API 응답을 boot 완료로 오판 ===');
await legacyBoot('A', 20);
await legacyShutdown();

// A의 소켓이 인증을 시도할 때까지 B의 API 응답은 오지 않게 한다.
const secondBoot = legacyBoot('B', 140);
await secondBoot;
await wait(100);
