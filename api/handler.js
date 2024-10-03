const url = require('url');
const dateHandler = require('./date');
const readHandler = require('./file/read');
const writeHandler = require('./file/write');
const deleteHandler = require('./file/delete');

/**
 * Handles the request and routes it to the appropriate handler
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @returns {void}
 * @throws {Error} If an error occurs while handling the request
 */
const handler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    try {
        switch (true) {
            case parsedUrl.pathname === '/':
                dateHandler(req, res, 'Ebaad');
                break;
            case parsedUrl.pathname.startsWith('/date'):
                dateHandler(req, res);
                break;
            case parsedUrl.pathname.startsWith('/file/read'):
                readHandler(req, res);
                break;
            case parsedUrl.pathname.startsWith('/file/write'):
                writeHandler(req, res);
                break;
            case parsedUrl.pathname.startsWith('/file/delete'):
                deleteHandler(req, res);
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
};

module.exports = handler;