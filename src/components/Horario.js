import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './styles/Horario.css'
import MyButton from "../hooks/MyButton";

function Horario (props) {
    const [ horario, setHorario ] = useState(props.horario_planejado)
    const [ horarioId, setHorarioId ] = useState(props.horarioId)
    const location = useLocation();
    
    return (
        <>
          <input
              type="time"
              name="horario_planejado"
              value={horario}
              onChange={(event) => props.addHorario(event.target.value, horarioId)} 
              />
          <MyButton
              className="btn"
              type="submit"
              onClick={() => {props.remRegister(props.horarioId)}}
              >
              -
          </MyButton>
        </>   
    )
    
}

export default Horario