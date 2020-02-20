import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  const proyectoscontext = useContext(proyectoContext);
  const { proyectoActual } = proyectoscontext;

  // obtener la funcion del context de tareas
  const tareascontext = useContext(tareaContext);
  const { obtenerTareas } = tareascontext;

  // Funcion para agregar la tarea al proyecto actual
  const seleccionarProyecto = id => {
    proyectoActual(id); // Fija el proyecto actual
    obtenerTareas(id);
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
