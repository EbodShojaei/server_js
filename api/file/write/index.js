const url = require('url');
const { appendToFile, fileExists } = require('../../../_modules/file');
const path = require('path');

/**
 * Handles appending text to the file.
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
module.exports = async (req, res) => {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const text = url.searchParams.get('text');

        if (!text) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('Bad Request: Missing query parameter "text"');
        }

        let filePath = path.join(process.cwd(), 'tmp/file.txt');

        const exists = await fileExists(filePath);
        if (!exists) filePath = path.join(process.cwd(), 'tmp/data.txt');
        await appendToFile(filePath, text);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Text appended to file: ${text}`);
    } catch (error) {
        console.error('Error handling write request:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
};