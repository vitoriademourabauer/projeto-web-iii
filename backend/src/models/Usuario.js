const {DataTypes, Model} = require('sequelize');
const { sequelize} = require('../instances/mysql');

class Usuario extends Model {}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allownull: false,
        },
        email: {
            type: DataType.STRING,
            allownull: false,
            unique: true,
        },
        senha: {
            type: DataType.STRING,
            allownull: false,
        },
        foto: {
            type: DataTypes.TEXT('long'),
            allownull: true,
        },
    },
    {
        sequelize,
        modelNAme: 'Usuario',
        tableName: 'usuarios',
        timestamp: true
    }
);

module.exports = Usuario;