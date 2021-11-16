const Sequelize = require('sequelize');

//Create Model

module.exports = (sequelize, type) => {
    return sequelize.define('categoria', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoria: Sequelize.STRING

    }, {
        timestamps: false
    });

}