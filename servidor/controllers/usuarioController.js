const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator"); // Valida los resultados de express Validator
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  // revisar que no haya errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    // reviso q el email no exista en bd
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // crea el nuevo usuario en bd
    usuario = new Usuario(req.body);

    // Hashear el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    // guarda el usuario
    await usuario.save();

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
    res.status(400).send("Ocurrió un error al momento de crear el usuario");
  }
};
