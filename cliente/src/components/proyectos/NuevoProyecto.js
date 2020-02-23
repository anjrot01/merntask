import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  // Obtener el state del formulario desde context
  const proyectoscontext = useContext(proyectoContext);
  const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectoscontext;

  // state de proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: ""
  });

  const { nombre } = proyecto;

  const onChangeProyecto = e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    });
  };

  const onClickFormulario = () => {
    mostrarFormulario();
  };

  const onSubmitProyecto = e => {
    e.preventDefault();

    // TODO Validar Proyecto

    if (nombre === "") {
      mostrarError();
      return;
    }

    // TODO Agregar al state
    agregarProyecto(proyecto);

    // TODO Reiniciar el form
    guardarProyecto({
      nombre: ""
    });
  };

  return (
    <Fragment>
      <button type="button" className="btn btn-block btn-primario" onClick={onClickFormulario}>
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input type="text" className="input-text" placeholder="Nombre Proyecto" name="nombre" onChange={onChangeProyecto} value={nombre} />
          <input type="submit" className="btn btn-primario btn-block" value="Agregar Proyecto" />
        </form>
      ) : null}
      {errorformulario ? <p className="mensaje error">El nombre es obligatorio</p> : null}
    </Fragment>
  );
};

export default NuevoProyecto;
