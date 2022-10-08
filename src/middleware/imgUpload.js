function uploadImg(path) {
    const multer = require("multer");
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/uploads/${path}`);
        },

        filename: function (req, file, cb) {
            const archiveExtension = file.originalname.split(".")[1];
            const newName = require("crypto").randomBytes(64).toString("hex");

            cb(null, `${newName}.${archiveExtension}`);
        },
    });

    const fileFilter = function (req, file, cb){
        const ext = file.originalname.split('.')[1];
        console.log(ext);
        if (ext !== 'jpg' && ext !== 'jpeg') {
            cb(new Error('apenas .jpg ou .jpeg'));
            cb(null, false);
        }
        cb(null, true);
    }

    return multer({ storage, fileFilter }).single("img");
}

module.exports = uploadImg;
