const url = require('url');
const { getDate, getTime12 } = require('../../_modules/date');
const { greeting } = require('../../lang/en/user');

/**
 * Handles the date request and returns the current date and time
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @returns {void}
 */
const dateHandler = (req, res, query = null) => {
    try {
        // checks
        if (req.method !== 'GET') {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
            return;
        }

        const parsedUrl = url.parse(req.url, true);
        const queryName = query || parsedUrl.query.name;

        if (!queryName) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request: Missing query parameter "name"');
            return;
        }

        if (queryName.length < 2) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request: Name must be at least 2 characters long');
            return;
        }

        if (queryName.length > 50) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request: Name must be at most 50 characters long');
            return;
        }

        if (!/^[a-zA-Z]+$/.test(queryName)) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request: Name must only contain letters');
            return;
        }

        const date = getDate();
        const time = getTime12();

        const responseMessage = greeting.replace('%1', queryName).replace('%2', `${date}, ${time}`);
        const formattedMessage = `
            <div style="
                text-align: center;
                padding: 50px;
                font-family: Arial, sans-serif;
                font-color: #00ffff;"
            >
                <h1>
                    ${responseMessage}
                </h1>
            </div>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(formattedMessage);
    } catch (error) {
        console.error('Error handling date request:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
};

module.exports = dateHandler;
