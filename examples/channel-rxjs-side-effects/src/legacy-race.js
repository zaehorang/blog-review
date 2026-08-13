// 채널톡 SDK 내부에 저장된 전역 상태를 단순화한 객체다.
// 실제 SDK에서는 JWT 외에도 사용자 정보, 채널 정보, 소켓 인스턴스 등이 있다.
const state = {
  sessionJWT: null,
  socketOwner: null,
};

// 네트워크 요청과 소켓 연결에 시간이 걸리는 상황을 재현한다.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const log = (message) => console.log(`${new Date().toISOString().slice(11, 23)} ${message}`);

async function connectSocketInBackground(name) {
  log(`[socket ${name}] gateway 주소 조회 + 연결 시작`);

  // 실제로는 다음 작업들이 비동기로 이어진다고 생각하면 된다.
  // 1. 게이트웨이에 연결할 소켓 서버 주소 요청
  // 2. 응답받은 주소로 소켓 연결
  await wait(80);

  // 소켓 연결 뒤에는 boot API에서 받은 JWT로 인증해야 한다.
  // 그런데 그사이 shutdown이 실행됐다면 JWT가 이미 사라져 있다.
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

  // boot API 응답으로 인증 토큰을 받았다고 가정한다.
  state.sessionJWT = `jwt-${name}`;
  log(`[boot ${name}] API 응답, JWT 저장`);

  // 핵심 문제 1:
  // `void`로 호출했기 때문에 소켓 작업의 완료를 await하지 않는다.
  // connectSocketInBackground는 계속 실행되지만 legacyBoot는 바로 끝난다.
  void connectSocketInBackground(name);

  // 핵심 문제 2:
  // API 응답만 받은 상태인데 고객 코드에는 전체 boot가 끝난 것처럼 보인다.
  log(`[boot ${name}] reported complete (하지만 소켓은 아직 실행 중)`);
}

async function legacyShutdown() {
  // 고객이 다음 boot를 요청하면 기존 연결을 정리하는 shutdown이 실행될 수 있다.
  // 첫 boot의 백그라운드 작업은 취소하지 못한 채 공유 상태만 지운다.
  log('[shutdown] JWT/store/socket 초기화');
  state.sessionJWT = null;
  state.socketOwner = null;
}

console.log('\n=== 문제 구조: API 응답을 boot 완료로 오판 ===');

// 호출자는 await가 끝났으므로 Boot A 전체가 완료됐다고 믿는다.
// 실제로는 connectSocketInBackground('A')가 뒤에서 계속 실행 중이다.
await legacyBoot('A', 20);

// 이 shutdown이 A의 JWT를 지운다.
await legacyShutdown();

// Boot B를 시작한다. A의 소켓 인증보다 B의 API 응답을 늦게 만들어,
// A가 JWT 없는 상태에서 인증을 시도하는 타이밍 버그를 확실히 재현한다.
const secondBoot = legacyBoot('B', 140);
await secondBoot;

// Boot B가 시작한 백그라운드 소켓 작업의 로그까지 기다린다.
await wait(100);
