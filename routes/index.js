const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World. Go to /api-docs to see how it works.')
});

router.use('/contacts', require('./contacts'));
router.use('/api-docs', require('./swagger'));

module.exports = router;