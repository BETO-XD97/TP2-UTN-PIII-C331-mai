const express = require('express')
const { obtenerEmpleados, obtenerUnEmp, actualizarEmp, eliminarEmp, crearEmp } = require('../controller/empleadoController.js')

const router = express.Router()

//Rutas para empleados
router.get('/', obtenerEmpleados)
router.get('/:idEmpleado', obtenerUnEmp)
router.post('/', crearEmp)
router.put('/:idEmpleado', actualizarEmp)
router.delete('/:idEmpleado', eliminarEmp)

module.exports = router