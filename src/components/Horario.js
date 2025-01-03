import React, { useState, useEffect } from "react";
import icChecked from '../images/checked.png'


const Horario = (props) => {
  const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
      fetch(`http://192.168.0.152:3001/medicamento/diario/${props.id}`, {
        method: 'GET'
      })
      .then(result => result.json()
      )
      .then(dados => {
        if (dados !== 0 ){
          setIsDisabled(true)
        }
      })
    }, [])

    const onClickRegistrar = (event) => {
        event.preventDefault()
        const horario = { horarios_id: props.id }

        fetch('http://192.168.0.152:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(horario)
        })
        .then((result) => result.json())
            .then((dados) => {
              if (dados.id) {
                setIsDisabled(true);
                alert(`Horário gravado com sucesso.`)
              } else {
                alert("Erro gravando o horário.");
              }
            })
            .catch((error) => console.error("Erro gravando o horário: ", error));
    }
    return (
        <div>
            <li>Horários: {props.horario} <button 
                                              type="submit" 
                                              onClick={onClickRegistrar} 
                                              disabled={isDisabled}>
                                                Tomei agora
                                          </button></li> 
        </div>
    )
}
export default Horario