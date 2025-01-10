import React, { useState, useEffect} from "react";
import './Medicamento.css'
import { formatarData } from "../util/dates";
import iClose from "../images/close.png"
import Quantidade from "./Quantidade";

const Medicamento = (props) => {
     const [ list_horarios, setListHorarios ] = useState([])
     const [ id, setId ] = useState(props.quantidade_estoque.id)
     const [ quantidade_estoque, setQuantidadeEstoque ] = useState(props.quantidade_estoque.quantidade_estoque)
    const [ ishidden, setIsHidden ] = useState(true);
     const [ nvhorario, setNvHorario ] = useState('00:00:00')
     const [ horario, setHorario ] = useState(props.horario)
     const [ horarioPlanejado , setHorarioPlanejado ] = useState(props.horario_planejado)
    
    useEffect(() => {
        console.log('passei aqui.')
        const result = horarioPlanejado.map(async _hora => {

            fetch(`http://192.168.0.152:3001/medicamento/diario/${_hora.id}`, {
            method: 'GET'
            })
            .then(result => result.json()
            )
            .then(dados => {
                console.log(dados)
                if (dados){
                    return {
                        buttonDisabled: _hora.buttonEstado = true,
                        id: _hora.id,
                        horario_planejado: _hora.horario_planejado
                    }   
                } 
            })
        })
        //console.log(result)
        setHorarioPlanejado(result)
    }, [horarioPlanejado])

    const listarDiarioMedicamento = (event) => {
        event.preventDefault()

        if (!list_horarios.length) {
            fetch(`http://192.168.0.152:3001/medicamentos/diario/${props.id}`, {
            method: 'GET'
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                }
            })
            .then(dados => {
                if (dados.length > 0) {
                    let response = []
                    dados.map(_regs => _regs.horarios_medicamentos.map(_hora => {
                        response.push({horario: formatarData(_hora.created_at).fullDate() })
                    }) )
                    setListHorarios(response)
                    return
                } else {
                    alert('Nenhum registro encontrado.')
                    return
                }
            })
        } else {
            setListHorarios([])
        }
        
    }

    const onRegistarHorarioMedicacao = (horarios_id) => {

        const horario = { horarios_id: horarios_id }
        fetch('http://192.168.0.152:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(horario)
        })
        .then((result) => result.json())
            .then((dados) => {
            if (dados.id) {
                let qtde = quantidade_estoque - 1
                setQuantidadeEstoque(qtde)
                const result = horarioPlanejado.map(_hora => {
                    if (_hora.id == horarios_id) {
                        return {
                            buttonDisabled: _hora.buttonEstado = true,
                            id: _hora.id,
                            horario_planejado: _hora.horario_planejado
                       } 
                    }
                })
                setHorarioPlanejado(result)
                alert(`Horário gravado com sucesso.`)
            } else {
                alert("Erro gravando o horário.");
            }
            })
            .catch((error) => console.error("Erro gravando o horário: ", error));
        
    }
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
       <div className="Medicamento">
            
            <ul>
                <h3>{props.nome}</h3>
                <li>Dosagem: {props.dosagem}</li>
                <li>Prescrição: {props.prescricao}</li>
                <li>Laboratório: {props.laboratorio}</li>
                <Quantidade id={id} quantidade_estoque={quantidade_estoque} />
                {horarioPlanejado.map(_hora => (
                    <li>Horário: {_hora.horario_planejado} 
                        <button className="button" style={{marginLeft: "10px"}} type="submit" onClick={onClickEditar}>Alterar</button>
                        <input className="novoHorario" hidden={ishidden} type="text" name="novo_horario" placeholder="Digite novo horáio" value={nvhorario} onChange={(event) => setNvHorario(event.target.value)} ></input>
                        <button className="button" type="submit" hidden={ishidden} onClick={onClickSalvar} >Salvar</button>
                        <button className="button" type="submit" value={_hora.id} onClick={(event) => onRegistarHorarioMedicacao(event.target.value)} disabled={_hora.buttonDisabled}>  Tomei agora </button>
  
                    </li>
                ))} 
                <div>
                    <button className="excluir" type="submit" onClick={props.removerMedicamento}>
                        <img
                            src={iClose}
                            alt="Button Icon"
                            style={{ width: "20px", height: "20px", marginRight: "4px" }}
                        />    
                    </button>
                    <button className="button" type="submit" onClick={listarDiarioMedicamento} >Listar diário</button>
                    <div>
                       {list_horarios.map(_horarios => (
                        <li>
                            Horário: {_horarios.horario}
                        </li>
                        ))} 
                    </div>
                    
                </div>
            </ul>
        </div> 
    )
    
};

export default Medicamento;