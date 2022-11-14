const fs=require('fs');
const http=require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate=require('./modules/replaceTemplate')

const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);
// console.log(dataObj);

const slugs=dataObj.map(el=>slugify(el.productName,{lower:true}))
// console.log(slugs);
// console.log(slugify("Fresh Avacados",{lower:true,trim:true}));
// Server
const server=http.createServer((req,res)=>{
    // console.log("url object=========>",req.url)
   const {query,pathname}= url.parse(req.url,true)
    const pathName=req.url;
    // overview page
    if(pathname==="/"|| pathname==="/overview"){
        res.writeHead(200,{
            'Content-Type':'text/html'
        });

      const cardsHtml=  dataObj.map(el=>replaceTemplate(tempCard,el)).join('');
      const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
    //   console.log(cardsHtml);
       
      res.end(output);

   
    }
     //   Product Page

    else if(pathname==="/product"){
        // console.log(query)
       
      res.writeHead(200,{
          'Content-Type':'text/html'
      })
      const product=dataObj[query.id]
      const output=replaceTemplate(tempProduct,product)
    //   res.write(`<h2>This is the product page</h2>`)
      res.end(output)
    }
    // API
    else if(pathname==="/api"){
     res.writeHead(200,{
        'Content-Type':'application/json'
     })
     res.end(data)
    }
    // Not Found
    
    else{
      res.writeHead(404,{
          'Content-Type':'text/html',
          'my-own-header':'hello world'
      })
      res.write(`<h1>We love javascript</h1>`)
      res.end(`<h1>The page not found</h1>`)
    }
     
  })
  
  server.listen(8000,()=>{
      console.log(`Server is running  at port 8000`)
  })