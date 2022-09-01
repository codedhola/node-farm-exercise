const http = require("http");
const fs = require("fs");
const path = require("path");

// API PATH TO FETCH
const api = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

//  PATHS TO HTML TEMPLATES
const overview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const template = fs.readFileSync(`${__dirname}/templates/product-template.html`, "utf-8");

const dataObj = JSON.parse(api);


function addTemplate(temp, elements){
    let output = temp.replace(/{%PRODUCTNAME%}/g, elements.productName);
    output = output.replace(/{%NUTRIENT%}/g, elements.nutrients);
    output = output.replace(/{%QUANTITY%}/g, elements.quantity);
    output = output.replace(/{%IMAGE%}/g, elements.image);
    output = output.replace(/{%PRICE%}/g, elements.price);
    output = output.replace(/{%LOCATION%}/g, elements.from);
    output = output.replace(/{%ID%}/g, elements.id);

    if(!elements.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

    }
    return output;
}


// CREATE A SERVER 
const server = http.createServer((req, res) => {
    const pathName = req.url;

    //  PRODUCT OVERVIEW PAGE
    if(pathName == "/" || pathName === "/overview"){
        res.writeHead(200, {"Content-Type" : "text/html"});
        const htmlCard = dataObj.map(el => addTemplate(card, el)).join("");

        const output = overview.replace('{%PRODUCTCARD%}', htmlCard);

        res.end(output);
    }
    // PRODUCT PAGE
    else if(pathName === "/product"){
        res.writeHead(200, {"Content-Type" : "text/html"});

        const htmlCard = dataObj.map(el => addTemplate(card, el)).join("");

        const output = template.replace('{%PRODUCTCARD%}', htmlCard);

        res.end(output);
    }else {
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end("<h1>THIS IS A 404 PAGE</h1>");
    }
});

server.listen(3000, () => {
    console.log("RUNNING SERVER ON PORT :3000");
})


