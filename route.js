const express = require('express');
const { upload } = require('./cloudinary');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to ASWANG FANPAGE API!');
});
router.post('/upload',upload.single('file'), controller.upload);
router.get('/arts', controller.getArts);
module.exports = router;

