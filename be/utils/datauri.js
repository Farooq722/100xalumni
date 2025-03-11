const DatauriParser = require('datauri/parser');
const path = require("path");

const getDataUri = (file) => {
    if (!file || !file.originalname) {
        throw new Error("Invalid file input: originalname is missing");
    }
    const parser = new DatauriParser();
    const extname = path.extname(file.originalname).toString();
    
    return parser.format(extname, file.buffer);
}

module.exports = getDataUri;

