const http = require('http');
const handler = require('./api/handler');

// Configure server port
const PORT = process.env.PORT || 7431;

// Create HTTP server
http.createServer((req, res) => {
    handler(req, res);
}).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Gracefully handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
