const router = require('express').Router();
const adminRoutes = require(`./admin/admin.route`);
const contentRoutes = require('./content/content.route');

router.get('/', async function(req, res) {
    res.status(200).json({ status : 200, message : '' })
});

router.use(`/admin`, adminRoutes);
router.use('/content', contentRoutes);
module.exports = router;