import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {
  const tareascontext = useContext(tareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    actualizarTarea,
    guardarTareaActual
  } = tareascontext;

  const proyectoscontext = useContext(proyectoContext);
  const { proyecto } = proyectoscontext;

  // Extraer el proyecto
  const [proyectoActual] = proyecto;

  // Funcion eliminar tarea
  const tareaEliminar = id => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual.id);
  };

  // Función que modifica el estado de las tareas
  const cambiarEstado = tarea => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  };

  // Agrega una tarea actual para editarla
  const seleccionarTarea = tarea => {
    guardarTareaActual(tarea);
  };

  return (
    <li className="tarea sombra" key={tarea._id}>
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => cambiarEstado(tarea)}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiarEstado(tarea)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => seleccionarTarea(tarea)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
