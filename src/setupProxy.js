const {createProxyMiddleware} = require('http-proxy-middleware')

// Solve CORS
module.exports = function(app) {
    app.use(
        createProxyMiddleware("/api/v3/coins", {
            target: "api.coingecko.com",
            secure: false,
            changeOrigin: true
        })
    );
};