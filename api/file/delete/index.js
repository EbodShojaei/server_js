const fs = require('fs');
const path = require('path');
const { fileExists } = require('../../../_modules/file');

module.exports = async (req, res) => {
    try {
        const filePath = path.join(process.cwd(), 'data/data.txt');

        const url = new URL(req.url, `http://${req.headers.host}`);
        const pwd = url.searchParams.get('pwd');

        if (!pwd) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('Bad Request: Missing query parameter "pwd"');
        }

        if (pwd !== 'password') {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            return res.end('Forbidden');
        }

        const exists = await fileExists(filePath);
        if (!exists) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end(`Error 503: Service Unavailable`);
        }

        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) return reject(err);
                resolve();
            })
        }).then(() => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File deleted');
        }).catch((err) => {
            console.error('Error deleting file:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        });
    } catch (error) {
        console.error('Error handling delete request:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
};