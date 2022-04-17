const Joi = require('joi');
const { upload } = require("./cloudinary");
const { getMaxListeners } = require('./models/FanArt');
const FanArt = require('./models/FanArt');


module.exports = {
    async upload(req, res) {
        try {
            const schema = new Joi.object({
                name: Joi.string().optional(),
                handle: Joi.string().required(),
                twitterUrl: Joi.string().optional()
            });
            const { error, value } = schema.validate(req.body);
            if (error) return res.status(400).json({ success: false, error: error.details[0].message, status: 400 });
            if (!req.file) return res.status(400).json({ success: false, error: 'Please upload your fan art', status: 400 });
            console.info(req.file);
            const { handle, name, twitterUrl } = value;
 
            const art = await FanArt.create({ mimetype: req.file.mimetype, artSrc: req.file.path, handle: handle.replace(/^(@)/,''), name, twitterUrl });
            return res.status(200).json({
                success: true,
                data: art,
                status: 200,
            }); 
        } catch (err) {
            console.error(err);
            return res.status(200).json({
                success: false,
                status: 500,
                error: 'Internal Server Error',
            })
        }
    },
    async getArts(req, res) {
        try {
            const { limit = 10 , page = 1 } = req.query;
            const arts = await FanArt.find()
                .sort({ updatedAt: -1 })
                .skip((page - 1) * limit)
                .limit(parseInt(limit, 10));
            const total = await FanArt.estimatedDocumentCount();
            return res.status(200).json({
                success: true,
                data: arts,
                total,
                totalPages: Math.ceil(total / limit),
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                status: 500,
                error: 'Internal Server Error',
            });
        }
    }
}