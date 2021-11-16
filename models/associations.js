const Sequelize = require('sequelize');

const Posts = require('./post');
const Category = require('./categoria');
const { Post } = require('../db');

// Post => Category

Post.hasMany(Category);
Category.belongsTo(Posts);