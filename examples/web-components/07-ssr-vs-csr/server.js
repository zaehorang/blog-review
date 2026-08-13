const http = require('http');

const PRODUCT = { name: '수분 크림', price: '32,000원' };

function csrPage() {
  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><title>CSR 버전</title></head>
<body style="font-family:sans-serif;padding:40px;">
<h1>CSR (Client-Side Rendering)</h1>
<div id="app">불러오는 중...</div>
<script>
  // 크롤러가 이 시간을 못 기다리면 빈 화면만 보게 된다
  setTimeout(() => {
    document.getElementById('app').innerHTML =
      '<h2>${PRODUCT.name}</h2><p>${PRODUCT.price}</p>';
  }, 800);
</script>
</body></html>`;
}

function ssrPage() {
  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><title>SSR 버전</title></head>
<body style="font-family:sans-serif;padding:40px;">
<h1>SSR (Server-Side Rendering)</h1>
<div id="app">
  <h2>${PRODUCT.name}</h2>
  <p>${PRODUCT.price}</p>
</div>
</body></html>`;
}

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  if (req.url === '/ssr') return res.end(ssrPage());
  return res.end(csrPage());
}).listen(5901, () => console.log('http://localhost:5901/csr  vs  http://localhost:5901/ssr'));
