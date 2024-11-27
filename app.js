const express = require('express')
const app = express()
const departamentoRouter = require('./router/departamentoRouter')
const empleadoRouter = require('./router/empleadoRouter')

app.use(express.json())

// Rutas
app.use('/departamentos', departamentoRouter)
app.use('/empleados', empleadoRouter)

const PORT = 3030

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})