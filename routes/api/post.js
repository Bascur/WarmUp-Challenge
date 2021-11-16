//Require modules
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


//New Post
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

//Edit post 

router.patch('/:id', async(req, res) => {
    //Get the post
    const post = await Post.findOne({
        where: { id: req.params.id }
    });
    //Check if post was fetch
    if (post === null) {
        res.json({
            error: "Post not found"
        });
    }
    //Update the post
    else {
        await Post.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({
            success: "Post Updated"
        });
    }
});

//Delete the post

router.delete('/:id', async(req, res) => {
    //Get the post
    const post = await Post.findOne({
        where: { id: req.params.id }
    });
    //Check if post was fetch
    if (post === null) {
        res.json({
            error: "Post not found"
        });
    }
    //Update the post
    else {
        await Post.destroy({
            where: { id: req.params.id }
        });
        res.json({
            success: "Post Deleted"
        });
    }
});

module.exports = router;