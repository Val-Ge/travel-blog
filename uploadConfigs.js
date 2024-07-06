//importing dependencies
const multer = require('multer');
const path = require('path');

//setting up storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now( )+ path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
