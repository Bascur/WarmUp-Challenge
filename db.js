const Sequelize = require('sequelize');
require('dotenv').config();


//Get Model

const postModel = require('./models/post');
const categoryModel = require('./models/categoria');

//Config Sequelize

const sequelize = new Sequelize(process.env.NAME, process.env.NAME, process.env.PASSWORD, {
    host: "remotemysql.com",
    dialect: "mysql"
});


//Excec the =>

const Post = postModel(sequelize, Sequelize);
const Category = categoryModel(sequelize, Sequelize);

//Update the DB

sequelize.sync({ force: false })
    .then(() => {
        console.log("Sync models");
    });

module.exports = {
    Post,
    Category,
    sequelize
}