const initPolyfills = () => {
  if (typeof globalThis.fetch !== 'function') {
    const http = require('http');
    const https = require('https');
    const { URL } = require('url');
  
    globalThis.fetch = (url, options = {}) =>
      new Promise((resolve, reject) => {
        const { hostname, port, pathname, protocol } = new URL(url);
        const mod = protocol === 'https:' ? https : http;
  
        const req = mod.request(
          {
            hostname,
            port,
            path: pathname,
            method: options.method || 'GET',
            headers: options.headers || {},
          },
          (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
              resolve({
                ok: true,
                status: res.statusCode,
                json: () => Promise.resolve(JSON.parse(data)),
                text: () => Promise.resolve(data),
              });
            });
          }
        );
  
        req.on('error', reject);
        if (options.body) req.write(options.body);
        req.end();
      });
  }
}

module.exports = {initPolyfills};