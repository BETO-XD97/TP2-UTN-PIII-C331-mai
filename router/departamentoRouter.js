const express = require('express')
const { obtenerUnDepto, obtenerDeptos, crearDepto, borrarDepto, actualizarDepto } = require('../controller/departamentoController.js')

const router = express.Router();

//Rutas para departamentos
router.get('/', obtenerDeptos)
router.get('/:idDepartamento', obtenerUnDepto)
router.post('/', crearDepto)
router.put('/:idDepartamento', actualizarDepto)
router.delete('/:idDepartamento', borrarDepto)

module.exports = router