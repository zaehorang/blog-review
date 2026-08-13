// CSRF 공격/방어 데모용 "은행" 서버 (교육 목적, localhost 전용)
const http = require('http');
const querystring = require('querystring');

let balance = 100000;
const csrfToken = 'tok_' + Math.random().toString(36).slice(2);

function html(res, body, headers = {}) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', ...headers });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => resolve(querystring.parse(data)));
  });
}

http.createServer(async (req, res) => {
  const cookie = req.headers.cookie || '';
  const loggedIn = cookie.includes('session=victim');

  if (req.url === '/login') {
    return html(res, `로그인 완료. <a href="/">내 계좌로</a>`, { 'Set-Cookie': 'session=victim; Path=/' });
  }

  if (req.url === '/') {
    return html(res, `
      <h1>내 은행 계좌</h1>
      <p>잔액: <b>${balance}</b>원</p>
      ${loggedIn
        ? `<p>로그인됨. CSRF 토큰(진짜 페이지만 아는 값): <code>${csrfToken}</code></p>
           <form action="/transfer-protected" method="POST">
             <input type="hidden" name="csrf" value="${csrfToken}">
             금액: <input name="amount" value="1000">
             <button>정상 이체 (방어된 엔드포인트, 토큰 있음)</button>
           </form>`
        : `<a href="/login">로그인하기</a>`
      }
      <hr>
      <p>공격 테스트: 다른 탭에서 <a href="http://localhost:5802">http://localhost:5802</a> (악성 사이트)를 열어보세요.</p>
    `);
  }

  if (req.url === '/transfer-vulnerable' && req.method === 'POST') {
    const body = await readBody(req);
    if (!loggedIn) return html(res, '로그인 필요');
    balance -= Number(body.amount || 0);
    return html(res, `🚨 [무방비 엔드포인트] ${body.amount}원 이체됨! 남은 잔액: ${balance}원 (요청 출처를 전혀 검증 안 함)`);
  }

  if (req.url === '/transfer-protected' && req.method === 'POST') {
    const body = await readBody(req);
    if (!loggedIn) return html(res, '로그인 필요');
    if (body.csrf !== csrfToken) {
      return html(res, `✅ [방어됨] CSRF 토큰이 없거나 틀려서 이체 거부. 잔액 그대로: ${balance}원`);
    }
    balance -= Number(body.amount || 0);
    return html(res, `이체 성공(정상 요청): ${body.amount}원. 남은 잔액: ${balance}원`);
  }

  html(res, '404');
}).listen(5801, () => console.log('은행 서버: http://localhost:5801 (먼저 /login으로 로그인하세요)'));
