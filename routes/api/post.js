//Require Router
const router = require('express').Router();
const { sequelize } = require('../../db')
const { QueryTypes } = require('sequelize');
//DB Model

const { Post } = require('../../db');

//Get all posts

router.get('/', async(req, res) => {
    const post = await sequelize.query("SELECT id, titulo, imagen, categoria, fecha FROM `posts` ORDER BY `fecha` DESC", { type: QueryTypes.SELECT });
    if (post.length === 0) {
        res.json({
            error: 'No posts found'
        });
    } else {
        res.json(post);
    }
});

//Get by ID

router.get('/:id', async(req, res) => {
    const post = await Post.findOne({
        where: { id: req.params.id }
    });
    if (post === null) {
        res.json({ error: "Post not found" })
    } else {
        res.json(post);
    }

});

module.exports = router;