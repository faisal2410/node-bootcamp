const fs = require('fs');
// console.log(fs)
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we read : ${textIn}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log("File written");