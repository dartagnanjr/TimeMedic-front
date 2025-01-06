import React, { useState, useEffect } from "react";
import '../components/Horario.css'

const Horario = (props) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [ ishidden, setIsHidden ] = useState(true);
  const [ horario, setHorario ] = useState(props.horario)
  const [ nvhorario, setNvHorario ] = useState('00:00:00')

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

    const onClickEditar = (event) => {
      event.preventDefault()
      setIsHidden(!ishidden)
    }

    const onClickSalvar = (event) => {
      event.preventDefault()
      if (window.confirm`Tem certeza que deseja salvar o novo horário ?`){

        const payLoad = { horario_planejado: nvhorario }

        fetch(`http://192.168.0.152:3001/horarios/${props.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(payLoad)
        }).then(result => {
          if (!result.ok) {
            alert('Problemas ao salvar o novo horário.', result.status )
          } else {
            setHorario(nvhorario)
            alert('Novo horário salvo com sucesso.')
            setIsHidden(true)
          }
        })
      }
    }

    return (
            <li>Horários: {horario} 
            <button style={{marginLeft: "10px"}} type="submit" onClick={onClickEditar}>Alterar</button>
              <input className="novoHorario" hidden={ishidden} type="text" name="novo_horario" placeholder="Digite novo horáio" value={nvhorario} onChange={(event) => setNvHorario(event.target.value)} ></input>
              <button type="submit" hidden={ishidden} onClick={onClickSalvar} >Salvar</button>
              <button type="submit" onClick={props.registrarHorario}> Tomei agora </button>
            </li> 
    )
}
export default Horario