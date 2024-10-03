const path = require('path');
const { readFileContent, fileExists } = require('../../../_modules/file');

/**
 * Handles reading the content of the file.
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
module.exports = async (req, res) => {
    const filePath = path.join('/data', 'data.txt');

    try {
        // Only allow GET requests
        if (req.method !== 'GET') {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
            return;
        }

        const exists = await fileExists(filePath);

        if (!exists) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end(`Error 503: Service Unavailable`);
        }

        const data = await readFileContent(filePath);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
    } catch (error) {
        console.error('Error reading file:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
};