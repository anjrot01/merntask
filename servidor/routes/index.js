const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// Controladores
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");
const proyectoController = require("../controllers/proyectoController");
const tareaController = require("../controllers/tareaController");

//middlewares
const auth = require("../middleware/auth");

//Usuarios

router.post(
  "/usuarios",
  [
    check("nombre", "El nombre es obligatorio")
      .not()
      .isEmpty(),
    check("email", "Agrega un email Válido").isEmail(),
    check("password", "El Password debe ser minimo de 6 caracteres").isLength({
      min: 6
    })
  ],
  usuarioController.crearUsuario
);

//Auth
// Iniciar Sesión
router.post(
  "/auth",
  // [
  //   check("email", "Agrega un email Válido").isEmail(),
  //   check("password", "El Password debe ser minimo de 6 caracteres").isLength({
  //     min: 6
  //   })
  // ],
  authController.autenticarUsuario
);

//Obtiene el usuario Autenticado

router.get("/auth", auth, authController.usuarioAutenticado);

// Proyectos
// Obtiene los proyectos
router.get("/proyectos", auth, proyectoController.obtenerProyectos);

// crea los proyectos
router.post(
  "/proyectos",
  [
    check("nombre", "El nombre es obligatorio")
      .not()
      .isEmpty()
  ],
  auth,
  proyectoController.crearProyecto
);

// Actualiza los proyectos por su id
router.put(
  "/proyectos/:id",
  auth,
  [
    check("nombre", "El nombre es obligatorio")
      .not()
      .isEmpty()
  ],
  proyectoController.actualizarProyectos
);

// Eliminar un proyecto

router.delete(
  "/proyectos/:id",
  auth,
  [
    check("nombre", "El nombre es obligatorio")
      .not()
      .isEmpty()
  ],
  proyectoController.eliminarProyecto
);

// Tareas

// Crear Tareas
router.post(
  "/tareas",
  auth,
  [
    check("nombre", "El nombre es obligatorio")
      .not()
      .isEmpty()
  ],
  tareaController.crearTarea
);

// Obtener Tareas
router.get("/tareas", auth, tareaController.obtenerTareas);

// Actualizar Tareas.
router.put("/tareas/:id", auth, tareaController.actualizarTarea);

//Eliminar Tareas
router.delete("/tareas/:id", auth, tareaController.eliminarTarea);

module.exports = router;
