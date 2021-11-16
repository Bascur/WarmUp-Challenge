//Require Router
const router = require('express').Router();
const { sequelize } = require('../../db')
const { QueryTypes } = require('sequelize');
//DB Model

const { Post } = require('../../db');

//Get Route

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

module.exports = router;