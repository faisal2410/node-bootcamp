const fs=require('fs');
const http=require('http');
const url = require('url');


// Files==========>
//Synchronous /Blocking
// const textIn=fs.readFileSync("./txt/input.txt",'utf-8')
// console.log(textIn)

// const textOut=`Regarding my Country: ${textIn}
// Created on ${new Date()}
// `;
// fs.writeFileSync("./txt/output.txt",textOut)
// console.log("File written")

// console.log(textOut)

// Asynchronous / Non Blocking

// const textIn=  fs.readFile("./txt/start.txt",'utf-8',(error,data)=>{
//     if(error) throw error
//      console.log(data)
// })
// console.log("Will Reading file")



// const textIn=  fs.readFile("./txt/start.txt",'utf-8',(error,data1)=>{
//   fs.readFile(`./txt/${data1}.txt`,'utf-8',(error,data2)=>{
//     if(error)throw error
//     console.log(data2)
//   })
// })
// console.log("Will Reading file")


// Callback hell

// const textIn=  fs.readFile("./txt/start.txt",'utf-8',(error,data1)=>{
//     if(error) return console.log("Error 😥")
//   fs.readFile(`./txt/${data1}.txt`,'utf-8',(error,data2)=>{
//     // console.log(data2)
//   fs.readFile(`./txt/append.txt`,'utf-8',(error,data3)=>{
//     //   console.log(data3);
//         fs.writeFile(`./txt/final.txt`,
//         `${data2}
//          ${data3}
//         `,'utf-8',(error)=>{
//             if(error) throw error
//             console.log(`File written`)
//         })

//   })
//   })
// })
// console.log("Will Reading file")


// Server ============>

// Simple Server
// const server=http.createServer((req,res)=>{
//     console.log("request object=======>",req)
//     res.end("Hello from the server");
// })

// server.listen(8000,()=>{
//     console.log(`Server is running successfully at port 8000`)
// })

// Study Url
const server=http.createServer((req,res)=>{
  console.log("url object=========>",req.url)
  const pathName=req.url;
  if(pathName==="/"|| pathName==="/overview"){
    res.end(`This is the overview`)
  }else if(pathName==="/product"){
    res.writeHead(200,{
        'Content-Type':'text/html'
    })
    res.write(`<h2>This is the product page</h2>`)
    res.end(`This is the product`)
  }else if(pathName==="/api"){
    fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(error,data)=>{
        const productData=JSON.parse(data);
        res.writeHead(200,{
            'Content-Type':'application/json'
        })
        res.end(data)
        console.log(productData)
    })
  }else{
    res.writeHead(404,{
        'Content-Type':'text/html',
        'my-own-header':'hello world'
    })
    res.write(`<h1>We love javascript</h1>`)
    res.end(`<h1>The page not found</h1>`)
  }
   
})

server.listen(8000,()=>{
    console.log(`Server is running successfully at port 8000`)
})