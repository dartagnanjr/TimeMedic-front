import React, { useState } from "react";
import './styles/Horario.css'
import MyButton from "../hooks/MyButton";

function Horario (props) {
    
    const [ horario, setHorario ] = useState(props.horario_planejado)
    const [ horarioId, setHorarioId ] = useState(props.horarioId)
    const onChangeHandler = (event) => {
        event.preventDefault()
        if (window.confirm`Confirma a inclusão do horário ${event.target.value} ?`){
            setHorario(event.target.value)
            setHorarioId(props.key)
            props.addHorario(horario)
        } else {
            return
        }
            
    }
    
    const onSubmitHandler = (key) => {
        props.remRegister(key)
    }
    return (
        <>
          <input
              type="time"
              key={props.key}
              //name="horario_planejado"
              value={horario}
              onChange={onChangeHandler} 
              />
            
          <MyButton
              className="btn"
              type="submit"
              value={props.key}
              onClick={onSubmitHandler}
              >
              -
          </MyButton>
        </>   
    )
    
}

export default Horario