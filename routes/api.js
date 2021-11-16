const router = require('express').Router();

//Routes

const postRoute = require('./api/post');

router.use('/post', postRoute);


module.exports = router;