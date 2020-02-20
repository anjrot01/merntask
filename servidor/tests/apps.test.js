const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const Usuario = require("../models/Usuario");
const Proyecto = require("../models/Proyecto");
const databaseName = "merntest";

beforeAll(async done => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  mongoose.set("useCreateIndex", true);
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  done();
});

// Happy Face :) Crea el usuario en la Bd
test("Debe crear un nuevo usuario en la Db", async done => {
  const response = await request.post("/api/usuarios").send({
    nombre: "Antonio",
    email: "anjrot@gmail.com",
    password: "123456"
  });
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({ token: response.body.token });
  done();
});

//Prueba los errores al crear el usuario

test("Debe mandar un error si los campos están vacios", async done => {
  const response = await request.post("/api/usuarios").send({
    nombre: "",
    email: "",
    password: ""
  });
  expect(response.status).toBe(400);
  expect(response.body).toMatchObject(response.body);
  done();
});

// Prueba de la autorizacion del login

test("Debe loguear un usuario con email y password", async done => {
  const response = await request.post("/api/auth").send({
    email: "anjrot@gmail.com",
    password: "123456"
  });

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({ token: response.body.token });

  // Guardo el token para pedirlo en los otros test y confirmar q la autenticación funciona
  await Usuario.findOneAndUpdate(
    { email: "anjrot@gmail.com" },
    { testToken: response.body.token },
    { new: true }
  );
  done();
});

// Prueba de creación de proyectos
test("Debe crear un nuevo proyecto", async done => {
  const usuario = await Usuario.findOne({ email: "anjrot@gmail.com" });
  const { testToken } = usuario;
  const response = await request
    .post("/api/proyectos")
    .set("x-auth-token", testToken)
    .send({ nombre: "Nombre del Proyecto" });

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(response.body);
  done();
});

// Obtengo los proyectos que haya en la bd
test("Debe obtener los proyectos creados", async done => {
  const usuario = await Usuario.findOne({ email: "anjrot@gmail.com" });
  const { testToken } = usuario;
  const response = await request
    .get("/api/proyectos")
    .set("x-auth-token", testToken);

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(response.body);
  done();
});

// Actualizar los proyectos
test("Debe actualizar un proyecto por su id", async done => {
  const usuario = await Usuario.findOne({ email: "anjrot@gmail.com" });
  const proyecto = await Proyecto.find();
  const { testToken } = usuario;

  const response = await request
    .put(`/api/proyectos/${proyecto[0]._id}`)
    .set("x-auth-token", testToken)
    .send({ nombre: "un nombre actualziado del proyecto" });

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(response.body);
  done();
});

// Borrar un proyecto
test("Debe eliminar un proyecto por su id", async done => {
  const usuario = await Usuario.findOne({ email: "anjrot@gmail.com" });
  const proyecto = await Proyecto.find();
  const { testToken } = usuario;

  const response = await request
    .delete(`/api/proyectos/${proyecto[0]._id}`)
    .set("x-auth-token", testToken);

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({ msg: "Proyecto Eliminado" });
  done();
});

// Elimino la Bd despues de las pruebas

afterAll(async done => {
  await mongoose.connection.db.dropDatabase();
  done();
});
