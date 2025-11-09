const router = require('express').Router();
const v1 = require('./v1/v1.route');

router.get('/health', async function(req, res) {
    res.status(200).json({ message : 'Just as good as new!', data: {} })
});

router.use('/v1', v1);

module.exports = router;