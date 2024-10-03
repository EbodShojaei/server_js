const fs = require('fs');
const path = require('path');

/**
 * Appends text to a file. If the file doesn't exist, it will be created.
 * 
 * @param {string} filePath - The path to the file.
 * @param {string} text - The text to append.
 * @returns {Promise<void>}
 */
const appendToFile = (filePath, text) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, text + '\n', (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

/**
 * Reads the content of a file.
 * 
 * @param {string} filePath - The path to the file.
 * @returns {Promise<string>}
 */
const readFileContent = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

/**
 * Checks if a file exists.
 * 
 * @param {string} filePath - The path to the file.
 * @returns {Promise<boolean>}
 */
const fileExists = (filePath) => {
    return new Promise((resolve) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            resolve(!err);
        });
    });
};

module.exports = {
    appendToFile,
    readFileContent,
    fileExists
};
