const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator"); // Valida los resultados de express Validator

exports.crearProyecto = async (req, res) => {
  // revisar que no haya errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    // Crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);

    // guardar el creador del proyecto via JWT
    proyecto.creador = req.usuario.id;

    // Guardar el proyecto
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1
    });
    res.json(proyectos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener los proyectos");
  }
};

// Actulizar los proyectos
exports.actualizarProyectos = async (req, res) => {
  // revisar que no haya errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Extraer la info del proyecto
  const { nombre } = req.body;
  let nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    // Revisar el id
    let proyecto = await Proyecto.findById(req.params.id);

    // Revisar si el proyecto existe
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    // verificar el creador del proyecto

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

// Elimina un proyecto por su id
exports.eliminarProyecto = async (req, res) => {
  try {
    // Revisar el id
    let proyecto = await Proyecto.findById(req.params.id);

    // Revisar si el proyecto existe
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    // verificar el creador del proyecto

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Eliminar el proyecto
    await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto Eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
