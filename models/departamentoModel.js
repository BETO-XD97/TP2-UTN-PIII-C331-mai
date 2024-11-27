const db = require('../data/db.js')

const { DataTypes } = require('sequelize')

const Departamento = db.define('departamentos', {
    idDepartamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Area: {
        type: DataTypes.STRING,
    },
    Es_Remoto: {
        type: DataTypes.BOOLEAN,
    },
    Director: {
        type: DataTypes.STRING,
    },
    Presupuesto: {
        type: DataTypes.DECIMAL(10, 2),
    },
    Cant_Empleados: {
        type: DataTypes.INTEGER,
    },
})

module.exports = Departamento
