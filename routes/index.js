const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello, see the contact data by going to /contacts.')
});

router.use('/contacts', require('./contacts'));
router.use('/api-docs', require('./swagger'));

module.exports = router;