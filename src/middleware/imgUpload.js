function uploadImg(path){
    const multer = require('multer');
    const storage = multer.diskStorage({

        destination: function (req, file, cb){
                cb(null, `src/uploads/${path}`)
        },

        filename: function(req, file, cb){

            const archiveExtension = file.originalname.split('.')[1];

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, `atest.${archiveExtension}`);
            }
    });
    
    return multer({storage}).single('image');
}
module.exports = uploadImg;