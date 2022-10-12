const multer = require("multer");
const crypto = require('crypto');
function uploadImg(path) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/uploads/${path}`);
        },

        filename: function (req, file, cb) {
            const archiveExtension = file.originalname.split(".")[1];
            const newName = crypto.randomBytes(64).toString("hex");

            cb(null, `${newName}.${archiveExtension}`);
        },
    });

    const fileFilter = function (req, file, cb){
        const ext = file.originalname.split('.')[1];
        if (ext !== 'jpg' && ext !== 'jpeg') {
            cb(new Error('apenas .jpg ou .jpeg'));
            cb(null, false);
        }
        cb(null, true);
    }

    return multer({ storage, fileFilter }).single("img");
}
function uploadImgArray(path) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/uploads/${path}`);
        },

        filename: function (req, file, cb) {
            const archiveExtension = file.originalname.split(".")[1];
            const newName = crypto.randomBytes(64).toString("hex");

            cb(null, `${newName}.${archiveExtension}`);
        },
    });

    const fileFilter = function (req, file, cb){
        const ext = file.originalname.split('.')[1];
        if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
            cb(new Error('apenas .jpg ou .jpeg'));
            cb(null, false);
        }
        cb(null, true);
    }

    return multer({ storage, fileFilter }).array('imgVilDisc',5);
}
module.exports = {uploadImg, uploadImgArray};
