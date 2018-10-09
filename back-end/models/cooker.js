const sequelizeDb = require('../database/db');
const Sequelize = require('sequelize');

const cookerModel = sequelizeDb.define('cooker', {

    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    presentation: {
        type: Sequelize.STRING,
        allowNull: true
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = cookerModel;