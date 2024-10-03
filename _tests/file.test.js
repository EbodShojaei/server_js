const assert = require('assert');
const fs = require('fs');
const { appendToFile, readFileContent, fileExists } = require('../_modules/file');
const path = require('path');

const testFilePath = path.join(__dirname, '../data/testFile.txt');

// Test appendToFile
async function testAppendToFile() {
    await appendToFile(testFilePath, 'Hello BCIT');
    const content = await readFileContent(testFilePath);
    assert(content.includes('Hello BCIT'), 'appendToFile failed');
}

// Test readFileContent
async function testReadFileContent() {
    const content = await readFileContent(testFilePath);
    assert.strictEqual(content.trim(), 'Hello BCIT', 'readFileContent failed');
}

// Test fileExists
async function testFileExists() {
    const exists = await fileExists(testFilePath);
    assert.strictEqual(exists, true, 'fileExists failed');
}

// Run tests
(async () => {
    await testAppendToFile();
    await testReadFileContent();
    await testFileExists();
    console.log('All file utility tests passed!');
    // Clean up
    fs.unlinkSync(testFilePath);
})();
