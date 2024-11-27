const db = require('../data/db')

const { DataTypes } = require('sequelize')

const Departamento = require('../models/departamentoModel.js')

const Empleado = db.define('empleados', {
    idEmpleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: {
        type: DataTypes.STRING,
    },
    Apellido: {
        type: DataTypes.STRING,
    },
    Salario: {
        type: DataTypes.DECIMAL(10, 2),
    },
    Dias_Vacaciones: {
        type: DataTypes.INTEGER,
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
    },
    Categoria: {
        type: DataTypes.STRING,
    } 
});

//Relación: Un departamento tiene muchos empleados (1:N)
Departamento.hasMany(Empleado, {
    foreignKey: 'idDepartamento',
    as: 'empleados',
    onDelete: 'SET NULL',  // Asegura que los empleados tengan el idDepartamento en null
});

Empleado.belongsTo(Departamento, {
    foreignKey: 'idDepartamento',
    as: 'departamento',
    onDelete: 'SET NULL',  // Esto actualizará el idDepartamento de los empleados a null al eliminar el departamento
});

module.exports = Empleado