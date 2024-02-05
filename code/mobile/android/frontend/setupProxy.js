const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://172.16.1.66:8080',
      changeOrigin: true,
    })
  );
};