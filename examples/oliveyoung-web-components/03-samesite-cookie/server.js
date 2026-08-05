// SameSite 쿠키 차단 데모 (의존성 0개)
// node server.js  → 두 개의 origin을 동시에 띄움
//   5601: 로그인 사이트 (Origin A)
//   5602: 외부 사이트, Origin A를 iframe으로 embed (Origin B)
const http = require('http');

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', ...headers });
  res.end(body);
}

// ── Origin A: 로그인 사이트 ──────────────────────────────
http.createServer((req, res) => {
  if (req.url === '/login') {
    return send(res, 200, `
      <h1>Origin A: 로그인 완료</h1>
      <p>쿠키를 <code>SameSite=Strict</code>로 심었습니다.</p>
      <a href="/profile">1) 같은 사이트에서 /profile 확인</a><br>
      <a href="http://localhost:5602">2) 다른 사이트(Origin B)로 이동해서 확인</a>
    `, { 'Set-Cookie': 'session=abc123; SameSite=Strict; Path=/' });
  }
  if (req.url === '/profile') {
    const hasCookie = (req.headers.cookie || '').includes('session=abc123');
    return send(res, 200, hasCookie
      ? `<h2 style="color:green">✅ 로그인됨 (쿠키 받음: ${req.headers.cookie})</h2>`
      : `<h2 style="color:red">❌ 쿠키 없음 — 로그인 안 된 것처럼 보임</h2>`);
  }
  send(res, 200, `<a href="/login">로그인하기</a>`);
}).listen(5601, () => console.log('Origin A(로그인 사이트): http://localhost:5601'));

// ── Origin B: 외부 사이트, Origin A를 iframe으로 embed ──────
http.createServer((req, res) => {
  send(res, 200, `
    <h1>Origin B: 다른 사이트</h1>
    <p>여기서 Origin A의 /profile을 iframe으로 불러옵니다.</p>
    <iframe src="http://localhost:5601/profile" style="width:100%;height:100px;border:1px solid #ccc;"></iframe>
  `);
}).listen(5602, () => console.log('Origin B(외부 사이트): http://localhost:5602'));
