const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.DEPLOY_RUN_PORT || '5000');
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'imagewebp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]));

  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (req.url !== '/' && !path.extname(req.url)) {
        fs.readFile(path.join(DIST_DIR, 'index.html'), (err2, data2) => {
          if (err2) {
            res.writeHead(500);
            res.end('Internal Server Error');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data2);
        });
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
      return;
    }

    const totalSize = stats.size;
    const range = req.headers.range;

    if (range) {
      const match = /bytes=(\d*)-(\d*)/.exec(range);
      if (match) {
        let start = match[1] ? parseInt(match[1], 10) : 0;
        let end = match[2] ? parseInt(match[2], 10) : totalSize - 1;
        if (isNaN(start) || start >= totalSize) {
          res.writeHead(416, { 'Content-Range': 'bytes */' + totalSize });
          res.end();
          return;
        }
        if (end >= totalSize) end = totalSize - 1;
        const chunkSize = end - start + 1;
        res.writeHead(206, {
          'Content-Range': 'bytes ' + start + '-' + end + '/' + totalSize,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': contentType,
        });
        fs.createReadStream(filePath, { start, end }).pipe(res);
        return;
      }
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': totalSize,
      'Accept-Ranges': 'bytes',
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Server running at http://0.0.0.0:' + PORT);
});
