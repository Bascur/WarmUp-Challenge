//Require Router
const router = require('express').Router();
const { sequelize } = require('../../db')
const { QueryTypes, DATE } = require('sequelize');
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



router.post('/', async(req, res) => {
    const date_time = new Date();
    const post = await Post.create({
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
        fecha: date_time
    });
    res.json(post);
})

module.exports = router;