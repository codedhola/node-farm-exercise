function addTemplate(temp, elements){
    let output = temp.replace(/{%PRODUCTNAME%}/g, elements.productName);
    output = output.replace(/{%NUTRIENT%}/g, elements.nutrients);
    output = output.replace(/{%QUANTITY%}/g, elements.quantity);
    output = output.replace(/{%IMAGE%}/g, elements.image);
    output = output.replace(/{%PRICE%}/g, elements.price);
    output = output.replace(/{%LOCATION%}/g, elements.from);
    output = output.replace(/{%ID%}/g, elements.id);
    output = output.replace(/{%DESCRIPTION%}/g, elements.description);
    
    if(!elements.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
        
    }
    return output;
}

module.exports = addTemplate;