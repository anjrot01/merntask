import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuhtContext from "../../context/autenticacion/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  const auhtContext = useContext(AuhtContext);
  const { autenticado, cargando, usuarioAutenticado } = auhtContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={props =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
