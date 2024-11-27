const Empleado = require('../models/empleadoModel.js')
const Departamento = require('../models/departamentoModel.js')


const obtenerEmpleados = async (req, res) => {
  
  try {
      const { page = 1, limit = 10, sort = "ASC", categoria, estado } = req.query;

      // Conversión de valores
      const pageInt = parseInt(page) || 1;
      const limitInt = parseInt(limit) || 10;
      const offset = (pageInt - 1) * limitInt;

      // Construcción de filtros dinámicos
      const filter = {};
      if (categoria) {
          filter.Categoria = categoria; // Filtro exacto por categoría
      }
      if (estado !== undefined) {
          filter.Estado = estado === "true"; // Conversión a booleano
      }

      // Orden dinámico
      const order = [["Nombre", sort.toUpperCase() === "DESC" ? "DESC" : "ASC"]];

      // Consulta a la base de datos
      const empleados = await Empleado.findAndCountAll({
          where: Object.keys(filter).length ? filter : {}, // Si no hay filtros devuelve todos los empleados
          limit: limitInt, // Límite de registros por página
          offset: offset, // Desplazamiento para la paginación
          order: order, // Orden por columna
      });

      // Respuesta con paginación y resultados
      res.json({
          total: empleados.count, // Total de registros que cumplen los filtros
          page: pageInt,
          limit: limitInt,
          empleados: empleados.rows, // Resultados de la consulta
      });

  } catch (error) {
      res.status(500).json({ message: error.message })
  }
}


const obtenerUnEmp = async (req, res) => {
  
  try {

    const empleado = await Empleado.findByPk(req.params.idEmpleado)
    
    if (empleado === null) {
      return res.status(404).send('NO SE PUDO OBTENER AL EMPLEADO')
    } else {
      res.json(empleado)
    }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const crearEmp = async (req, res) => {
  
  try {
    // verificar si el idDepartamento existe y es valido
    if (req.body.idDepartamento !== undefined && req.body.idDepartamento !== null) {
      const departamento = await Departamento.findByPk(req.body.idDepartamento)
      
      if (!departamento) {
        return res.status(404).send('NO HAY UN DEPARTAMENTO CON EL ID AL QUE SE LE QUIERE AGREGAR');
      }
    }

    const empleado = await Empleado.create(req.body)

    res.status(200).json({ 
      message: 'EMPLEADO CREADO CON EXITO',
      empleadoCreado: empleado
    });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


const actualizarEmp = async (req, res) => {
  
  try {

    const { idDepartamento } = req.body;

    if (idDepartamento) {
      const departamentoExiste = await Departamento.findOne({
        where: { idDepartamento },
      });

      if (!departamentoExiste) {
        return res.status(404).send('DEPARTAMENTO NO ENCONTRADO');
      }
    }
    
    const [actualizado] = await Empleado.update(req.body, {
      where:{idEmpleado:req.params.idEmpleado}
    })
    if (actualizado) {
      res.send('EMPLEADO ACTUALIZADO CON EXITO')
    } else {
      res.status(400).send('NO SE REALIZÓ NINGÚN CAMBIO')
    }
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}


const eliminarEmp = async (req,res)=>{
  
  try {

    const eliminado = await Empleado.destroy({
         where : {idEmpleado:req.params.idEmpleado} 
       })
    
    if (eliminado > 0) {
      res.send('EMPLEADO ELIMINADO CON EXITO')
    } else {
      res.status(404).send('EMPLEADO NO ENCONTRADO')
    }

  } catch (error) {
      res.status(500).json({ error: error.message })
  }
}


module.exports = {obtenerEmpleados, obtenerUnEmp, actualizarEmp, eliminarEmp, crearEmp}


