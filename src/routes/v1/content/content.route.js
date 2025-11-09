const router = require('express').Router();

router.get('/', async function(req, res) {
    return res.status(200).send({message: `Content Home route`, data: {}});
})

module.exports = router;