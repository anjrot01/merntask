const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator"); // Valida los resultados de express Validator
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  // revisar que no haya errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Extraer el email y el password

  const { email, password } = req.body;

  try {
    // Revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "Es usuario no existe" });
    }

    // Revisar el password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }

    // si todo es correcto crear el token

    // Crear y firmar el jwt
    const payload = {
      usuario: {
        id: usuario.id
      }
    };

    jwt.sign(
      payload,
      process.env.SECRETO,
      {
        expiresIn: 3600
      },
      async (error, token) => {
        if (error) throw error;

        // Mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Obtiene el usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await await Usuario.findById(req.usuario.id).select(
      "-password"
    );
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
