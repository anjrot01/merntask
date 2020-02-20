const Tarea = require("../models/Tareas");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator"); // Valida los resultados de express Validator

// Crea una nueva tarea
exports.crearTarea = async (req, res) => {
  // revisar que no haya errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { proyecto } = req.body;

  // extraer el proyecto y comprobar si existe
  try {
    const proyectoExist = await Proyecto.findById(proyecto);
    if (!proyectoExist) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Revisar si el proyecto actual pertenece al usuario auntenticado

    if (proyectoExist.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // crear tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

// Obtener las tareas por proyecto
exports.obtenerTareas = async (req, res) => {
  try {
    // extraer el proyecto y comprobar si existe
    const { proyecto } = req.query;
    const proyectoExist = await Proyecto.findById(proyecto);
    if (!proyectoExist) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Revisar si el proyecto actual pertenece al usuario auntenticado

    if (proyectoExist.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Obtener las tareas x proyecto
    const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

// Actualizar las tareas
exports.actualizarTarea = async (req, res) => {
  try {
    // extraer el proyecto y comprobar si existe
    const { proyecto, nombre, estado } = req.body;

    //  Revisar si la tarea existe
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(401).json({ msg: "No existe la tarea" });
    }

    //  Extraer proyecto
    const proyectoExist = await Proyecto.findById(proyecto);
    // Revisar si el proyecto actual pertenece al usuario auntenticado
    if (proyectoExist.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // crear un objeto con la nueva información
    let nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    //  Guardar la tarea
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true
    });

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

// Eliminar una tarea por su ID
exports.eliminarTarea = async (req, res) => {
  try {
    // extraer el proyecto y comprobar si existe
    const { proyecto } = req.query;

    //  Revisar si la tarea existe
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(401).json({ msg: "No existe la tarea" });
    }

    //  Extraer proyecto
    const proyectoExist = await Proyecto.findById(proyecto);
    // Revisar si el proyecto actual pertenece al usuario auntenticado
    if (proyectoExist.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Eliminar Tarea
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea Eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};
