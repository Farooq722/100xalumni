
const multer = require("multer");

const storage = multer.memoryStorage();
const singleUpload = multer({ 
    storage 
}).fields([
    { name: "profilePhoto", maxCount: 1 },  
    { name: "resume", maxCount: 1 }  
]);

module.exports = {
    singleUpload
};
