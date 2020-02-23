import React, { Fragment, useContext } from "react";
import Tarea from "../tareas/Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const ListadoTareas = () => {
  const proyectoscontext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectoscontext;

  // Obtener las tares del proyecto
  const tareascontext = useContext(tareaContext);
  const { tareasProyecto } = tareascontext;

  // si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  // Array destructuring para exxtraer el proyecto actual
  const [proyectoActual] = proyecto;

  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay Tareas</p>
          </li>
        ) : (
          tareasProyecto.map(tarea => <Tarea key={tarea._id} tarea={tarea} />)
        )}

        <button
          type="button"
          className="btn btn-eliminar"
          onClick={onClickEliminar}
        >
          Eliminar Proyecto &times;
        </button>
      </ul>
    </Fragment>
  );
};

export default ListadoTareas;
