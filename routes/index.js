const router = require('express').Router();
router.use('/', require('./swagger'));

router.use('/recipes', require('./recipes'));
router.use('/menus', require('./menus'));

module.exports = router;
