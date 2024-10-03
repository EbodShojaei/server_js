const url = require('url');
const { getDate, getTime12 } = require('../../_modules/date');
const { greeting } = require('../../lang/en/user');

/**
 * Handles the date request and returns the current date and time
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
module.exports = (req, res) => {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const name = url.searchParams.get('name') || 'Ebaad';

        const date = getDate();
        const time = getTime12();

        const responseMessage = greeting.replace('%1', name).replace('%2', `${date}, ${time}`);
        const formattedMessage = `
            <div style="
                text-align: center;
                padding: 50px;
                font-family: Arial, sans-serif;
                color: #00ffff;">
                <h1>${responseMessage}</h1>
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