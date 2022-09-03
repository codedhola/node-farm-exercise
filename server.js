const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const addTemplate = require("./addTemplate")

// API PATH TO FETCH
const api = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

//  PATHS TO HTML TEMPLATES
const overview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const template = fs.readFileSync(`${__dirname}/templates/product-template.html`, "utf-8");

const dataObj = JSON.parse(api);





// CREATE A SERVER 
const server = http.createServer((req, res) => {
    const {query, pathname } = url.parse(req.url, true);
    
    //  PRODUCT OVERVIEW PAGE
    if(pathname == "/" || pathname === "/overview"){
        res.writeHead(200, {"Content-Type" : "text/html"});
        const htmlCard = dataObj.map(el => addTemplate(card, el)).join("");

        const output = overview.replace('{%PRODUCTCARD%}', htmlCard);

        res.end(output);
    }
    // PRODUCT PAGE
    else if(pathname === "/product"){
        res.writeHead(200, {"Content-Type" : "text/html"});
        const product = dataObj[query.id];
        const output = addTemplate(template, product)
        res.end(output);
    }else {
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end("<h1>THIS IS A 404 PAGE</h1>");
    }
});

server.listen(3000, () => {
    console.log("RUNNING SERVER ON PORT :3000");
})


