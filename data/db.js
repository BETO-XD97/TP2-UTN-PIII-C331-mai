require('dotenv').config() // Cargar variables de entorno

const { Sequelize } = require('sequelize')

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
    }
);

const pruebaConexion = async () => {
    try {
        await db.authenticate()
        console.log('Conexión a la base de datos establecida correctamente.')
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error.message)
    }
}

pruebaConexion()

module.exports = db