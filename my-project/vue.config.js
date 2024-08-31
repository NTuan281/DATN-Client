module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://datn-server-production.up.railway.app', // URL of your Spring Boot server
                ws: true,
                changeOrigin: true
            }
        }
    }
};
