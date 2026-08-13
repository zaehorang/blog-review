// CDN 캐시 흉내: .js 파일은 max-age=3600으로 오래 캐싱되게 응답한다.
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'public');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  const filePath = path.join(root, urlPath === '/' ? '/index.html' : urlPath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    const ext = path.extname(filePath);
    const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream' };
    if (ext === '.js') headers['Cache-Control'] = 'public, max-age=3600'; // 진짜 CDN처럼 오래 캐싱
    res.writeHead(200, headers);
    res.end(data);
  });
}).listen(5701, () => console.log('CDN 흉내 서버: http://localhost:5701'));
