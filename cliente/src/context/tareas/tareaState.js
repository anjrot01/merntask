import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import ClienteAxios from "../../config/axios";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "../../types";
import clienteAxios from "../../config/axios";

const TareaState = props => {
  const initialState = {
    tareasProyecto: [],
    errortarea: false,
    tareaseleccionada: null
  };

  // Crear el dispatch y el state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Crear las funciones

  // Obtener las tareas de un proyecto

  const obtenerTareas = async proyecto => {
    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyecto }
      });
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // Agregar una tarea al proyecto seleccionado
  const agregarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);

      console.log(resultado);

      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // Validar Tarea
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };

  // Eliminar Tarea
  const eliminarTarea = async (id, proyecto) => {
    try {
      await ClienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // Edita o modifica una tarea
  const actualizarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );

      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    });
  };

  // Elimina la tarea Seleccionada

  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
