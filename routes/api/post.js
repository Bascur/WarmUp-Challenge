//Require modules
const router = require('express').Router();
const { sequelize } = require('../../db')
const { QueryTypes } = require('sequelize');
const got = require('got');
const fileType = require('file-type');

//DB Model
const { Post, Category } = require('../../db');


//Get all posts
router.get('/', async(req, res) => {
    const post = await sequelize.query("SELECT id, titulo, imagen, fecha, categories.categoria FROM `posts` INNER JOIN categories ON posts.categoria = categories.category_id ORDER BY `fecha` DESC", { type: QueryTypes.SELECT });
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
    try {
        if (isNaN(req.params.id)) { throw new Error() };
        await sequelize.query(`SELECT id, titulo, imagen, fecha, contenido, categories.categoria FROM posts INNER JOIN categories ON posts.categoria = categories.category_id WHERE posts.id = ${req.params.id}`, { type: QueryTypes.SELECT })
            .then(post => {
                if (post === true) {
                    res.json(post);
                } else {
                    res.status(400).send({ error: "Post not found." });
                }
            }).catch(error => {
                res.status(500).json(error)
            });
    } catch { res.status(500).json({ error: "The id must be a number" }) }
})


//New Post
router.post('/', async(req, res) => {
    const date_time = new Date();
    await Post.create({
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
        fecha: date_time
    }).then(post => {
        res.status(201).json(post)
    }).catch((error) => {
        res.status(500).json(error)
    });

})

//Edit post 
router.patch('/:id', async(req, res) => {
    try {
        if (isNaN(req.params.id)) { throw new Error() };
        await Post.findOne({
            where: { id: req.params.id }
        }).then((post) => {
            if (post !== null) {
                Post.update(req.body, {
                    where: { id: req.params.id }
                }).then(() => {
                    res.status(200).json({ success: "Post updated" })
                }).catch(error => {
                    res.status(500).json(error)
                });
            } else {
                res.json({ error: "Post not found" })
            }
        })
    } catch { res.status(500).json({ error: "The id must be a number" }) }
});

//Delete the post
router.delete('/:id', async(req, res) => {
    try {
        if (isNaN(req.params.id)) { throw new Error() };
        await Post.findOne({
            where: { id: req.params.id }
        }).then((post) => {
            if (post !== null) {
                Post.destroy({
                    where: { id: req.params.id }
                }).then(() => {
                    res.status(200).json({ success: "The post was deleted" })
                }).catch(error => {
                    res.status(500).json(error);
                });
            } else {
                res.status(404).json({ error: "Post not found" })
            }
        })
    } catch {
        res.status(500).json({ error: "The id must be a number" });
    }
});

module.exports = router;