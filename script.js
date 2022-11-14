const fs=require('fs');
const http=require('http');
const url = require('url');

// Synchronous

// const textIn=fs.readFileSync(`${__dirname}/txt/input.txt`,'utf-8')
// console.log(textIn)

// fs.writeFileSync(`${__dirname}/txt/output.txt`,textIn)
// console.log("File Written")

// Asynchronous

const textIn=fs.readFile(`${__dirname}/txt/input.txt`,'utf-8',(error,data)=>{
    if(error) throw error
    console.log(data)
})

fs.writeFile(`${__dirname}/txt/output.txt`,textIn,'utf-8',(error)=>{
    if(error) throw error
    console.log("File written")

})









