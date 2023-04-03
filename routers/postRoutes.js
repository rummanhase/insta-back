require('dotenv').config();
const express = require('../export-lib/libraries').express;
const router = express.Router();
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-Storage');
const postController = require('../controllers/postControllers');
 
const Storage = new GridFsStorage({
    url : process.env.DB_URL+process.env.DB_NAME,
    file : (req , file) =>{
        console.log(file);
        return {
            bucketName : process.env.DB_COLLECTION,
            filename : `${Date.now()}_${file.originalname}`
        }
    }});

const Upload = multer({
    storage:Storage
})

router.post('/post' , Upload.single("image") , postController.post);

router.get('/posts' , postController.get);

router.get('/image/:name' , postController.load);

module.exports = router