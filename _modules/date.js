// credits: https://www.shecodes.io/athena/4069-how-to-display-12-hour-time-with-javascript
const TIME = {
    OPTIONS: {
        timeStyle: 'short',
        hour12: true,
    },
    locale: 'en-US',
};

/** 
 * Returns the current time in 12-hour format
 * @returns {string} the current time in 12-hour format 
 */
const getTime12 = () => {
    return new Date().toLocaleTimeString('en-US', TIME.OPTIONS);
};

/** 
 * Returns the current date
 * @returns {string} the current date
 */
const getDate = () => {
    return new Date().toDateString();
};

module.exports = { getTime12, getDate };