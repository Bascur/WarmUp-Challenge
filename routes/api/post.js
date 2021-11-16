//Require Router
const router = require('express').Router();
//DB Model

const { Post } = require('../../db');

//Get Route

router.get('/', async(req, res) => {
    const post = await Post.findAll({});
    if (post.length === 0) {
        res.json({
            error: 'No posts found'
        });
    } else {
        res.json(post);
    }

});


module.exports = router;