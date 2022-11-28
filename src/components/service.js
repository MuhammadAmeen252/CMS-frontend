var striptags = require('striptags');

function cleanObjectValues(obj){
    for (let key of Object.keys(obj)) {
        obj[key] = striptags(obj[key]);
    }
    return obj;
}

export {
    cleanObjectValues
}