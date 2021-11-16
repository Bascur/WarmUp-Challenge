const router = require('express').Router();

//Routes

const postRoute = require('./api/post');

router.use('/post', postRoute);
router.use('/post/:id', postRoute);


module.exports = router;