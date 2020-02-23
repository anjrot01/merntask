import React, { useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthContext from "../../context/autenticacion/authContext";

const Proyectos = () => {
  // Extrae la info del context
  const authcontext = useContext(AuthContext);
  const { usuarioAutenticado } = authcontext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <aside>
        <Sidebar />
      </aside>
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedo-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
