import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const proyectoscontext = useContext(proyectoContext);
  const { proyecto } = proyectoscontext;

  const tareascontext = useContext(tareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea
  } = tareascontext;

  // Effect q detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: ""
      });
    }
  }, [tareaseleccionada]);

  const [tarea, guardarTarea] = useState({
    nombre: ""
  });

  // Extraer el nombre del proyecto
  const { nombre } = tarea;

  // si no hay proyecto seleccionado
  if (!proyecto) return null;

  // State del formulario

  // Array destructuring para exxtraer el proyecto actual
  const [proyectoActual] = proyecto;

  // Leer los valores del formulario

  const handleCheange = e => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    //validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    // Revisar si es edicion o nueva tarea
    if (tareaseleccionada === null) {
      //tarea nueva
      //agreagar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      // actualizar tarea existente
      actualizarTarea(tarea);
      limpiarTarea();
    }

    //Pasar la validacion

    // Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual._id);

    //reiniciar el form
    guardarTarea({
      nombre: ""
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            onChange={handleCheange}
            value={nombre}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
