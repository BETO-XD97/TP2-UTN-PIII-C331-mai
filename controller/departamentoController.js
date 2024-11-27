const Departamento = require('../models/departamentoModel.js')
const Empleado = require('../models/empleadoModel.js')


const obtenerDeptos = async (req, res) => {
  
  try {
    const { page = 1, limit = 10, sort = "ASC", es_Remoto } = req.query;

    // Conversión de valores
    const pageInt = parseInt(page) || 1;
    const limitInt = parseInt(limit) || 10;
    const offset = (pageInt - 1) * limitInt;

    // Construcción de filtros dinámicos
    const filter = {};
    if (es_Remoto !== undefined) {
      filter.es_Remoto = es_Remoto === "true"; // Conversión a booleano
    }

    // Orden dinámico
    const order = [["Cant_Empleados", sort.toUpperCase() === "DESC" ? "DESC" : "ASC"]];

    // Consulta a la base de datos
    const departamento = await Departamento.findAndCountAll({
      where: Object.keys(filter).length ? filter : {}, // Si no hay filtros devuelve todos los departamentos
      limit: limitInt,  // Límite de registros por página
      offset: offset,   // Desplazamiento para la paginación
      order: order,     // Orden por número de empleados
    });

    // Respuesta con paginación y resultados
    res.json({
      total: departamento.count,  // Total de registros que cumplen los filtros
      page: pageInt,
      limit: limitInt,
      departamentos: departamento.rows,  // Resultados de la consulta
    });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}



const obtenerUnDepto= async (req, res) => {
  
  try {
    const departamento = await Departamento.findByPk(req.params.idDepartamento)
    
    if (departamento == null) {
      res.status(404).send('DEPARTAMENTO NO ENCONTRADO')
    } else {
      res.json(departamento)
    }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const crearDepto = async (req, res) => {
    
  try {
      const departamento = await Departamento.create(req.body)
      
      if (departamento) {
        res.status(200).json({ 
            message: 'DEPARTAMENTO CREADO CON EXITO',
            departamento: departamento 
        });
      } else {
        res.send('NO SE PUDO CREAR UN DEPARTAMENTO')
      }
      
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
}
 
const actualizarDepto = async (req, res) => {
    
  try {
      const [actualizado] = await Departamento.update(req.body, {
        where: { idDepartamento: req.params.idDepartamento },
      });
  
      if (actualizado) {
        res.status(200).send('DEPARTAMENTO ACTUALIZADO CON EXITO')
      } else {
        res.status(400).send('NO SE REALIZÓ NINGÚN CAMBIO')
      }
    } catch (error) { 
      res.status(500).json({ error: error.message })
    }
}

/*Debido a la relacion de 1:N(departamento:empleados) para poder borrar un 
departamento tengo que volver nulo la foreignkey(idDepartamento) de la tabla 'empleados'
solo asi se podra eliminar el departamento, por lo tanto el siguien codigo se encarga de eso*/
const borrarDepto = async (req, res) => {
  
  try {
      await Empleado.update(
          { idDepartamento: null }, 
          { where: { idDepartamento: req.params.idDepartamento } }
      )

      const eliminado = await Departamento.destroy({
          where: { idDepartamento: req.params.idDepartamento },
      })

      if (eliminado > 0) {
          res.status(200).send('DEPARTAMENTO ELIMINADO Y EMPLEADOS ACTUALIZADOS A NULL CON EXITO')
      } else {
          res.status(404).send('DEPARTAMENTO NO ENCONTRADO')
      }
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}


module.exports = {obtenerUnDepto, obtenerDeptos, crearDepto, borrarDepto, actualizarDepto}


