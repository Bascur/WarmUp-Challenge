const router = require('express').Router();

//Routes

const postRoute = require('./api/post');

router.use('/posts', postRoute);
router.use('/posts/:id', postRoute);


module.exports = router;