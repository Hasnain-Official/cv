const router = require('express').Router();

router.get('/', async function(req, res) {
    res.status(200).json({ status : 200, message : '' })
});

module.exports = router;