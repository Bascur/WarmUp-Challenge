const Sequelize = require('sequelize');

//Create Model

module.exports = (sequelize, type) => {
    return sequelize.define('post', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: Sequelize.STRING,
        contenido: Sequelize.TEXT,
        imagen: Sequelize.STRING,
        categoria: {
            type: Sequelize.INTEGER,
            references: {
                model: "categoria",
                key: 'id'
            }
        },
        fecha: Sequelize.DATE,

    }, {
        timestamps: false
    });

}