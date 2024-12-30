import React, { useState } from "react";


const Horario = (props) => {
  const [isDisabled, setIsDisabled] = useState(false);

    const onClickRegistrar = (event) => {
        event.preventDefault()
        const horario = { horarios_id: props.id }

        fetch('http://localhost:3001/register', {
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
            <li>Horários: {props.horario} <button type="submit" onClick={onClickRegistrar} disabled={isDisabled}>Tomei o remédio agora...</button></li> 
        </div>
    )
}
export default Horario