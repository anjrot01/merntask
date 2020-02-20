import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";

const ListadoProyectos = () => {
  // Obtener el state del formulario desde context
  const proyectoscontext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectoscontext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {
    // si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  // revisar si proyectos tiene contenido
  if (proyectos.length === 0) return <p>No hay proyectos</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      {proyectos.map(proyecto => (
        <Proyecto key={proyecto._id} proyecto={proyecto} />
      ))}
    </ul>
  );
};

export default ListadoProyectos;
