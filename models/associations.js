const Sequelize = require('sequelize');

const Posts = require('./post');
const Category = require('./categoria');
const { Post } = require('../db');

// Post => Category

Post.hasOne(Category);
Category.belongsTo(Posts);