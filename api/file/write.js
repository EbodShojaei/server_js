const url = require('url');
const { appendToFile } = require('../../_modules/file');
const path = require('path');

/**
 * Handles appending text to the file.
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
async function handler(req, res) {
    try {
        const parsedUrl = url.parse(req.url, true);
        const queryText = parsedUrl.query.text;

        if (!queryText) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('Bad Request: Missing query parameter "text"');
        }

        const filePath = path.join(process.cwd(), 'data/file.txt'); // Use process.cwd()
        await appendToFile(filePath, queryText);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Text appended to file: ${queryText}`);
    } catch (error) {
        console.error('Error handling write request:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

module.exports = handler;