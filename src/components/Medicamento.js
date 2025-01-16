import React, { useState, useEffect } from "react";
import './Medicamento.css'
import { formatarData } from '../util/dates'
import iClose from "../images/close.png"
import Quantidade from "./Quantidade";
import MyButton from "../hooks/MyButton";
import api from '../services/api'

const Medicamento = (props) => {
    const [ list_horarios, setListHorarios ] = useState([])
    const [ quantidade_estoque, setQuantidadeEstoque ] = useState(props.quantidade_estoque.quantidade_estoque)
    const [ ishidden, setIsHidden ] = useState(true);
    const [ nvhorario, setNvHorario ] = useState('00:00:00')
    const [ horario, setHorario ] = useState(props.horario)
    //const [ medicamentos, setMedicamentos ] = useState(props.medicamentos.medicamentos)
    const [ horarioPlanejado , setHorarioPlanejado ] = useState(props.horario_planejado)
    
    const atulizaHorarios = (dados) => {

        const result = horarioPlanejado.map(_hora => {
            if (_hora.id === dados.id) {
                console.log(_hora.id, ',', dados.id)
                return {
                    buttonDisabled: true,
                    id: _hora.id,
                    horario_planejado: _hora.horario_planejado
               } 
            } else {
                return {
                    buttonDisabled: _hora.buttonDisabled,
                    id: _hora.id,
                    horario_planejado: _hora.horario_planejado
               } 
            }
        })
        setHorarioPlanejado(result)
    }

    useEffect(() => {

        api.get('/medicamentos/', { id: props.id })
        .then(result => {
            if (!result.ok) { throw new Error('Problemas no retorno da API')}
            else { return result.json()}
        }).then(dados => {
            if (dados) {
                atulizaHorarios(dados)
                return
            } else {
                alert('Nenhum registro encontrado.')
                return
            }
        })

    }, [])

    const listarDiarioMedicamento = (event) => {
        //event.preventDefault()

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
                const result = horarioPlanejado.map(_hora => {
                    if (_hora.id === dados.id) {
                        return {
                            buttonDisabled: true,
                            id: _hora.id,
                            horario_planejado: _hora.horario_planejado
                       } 
                    } else {
                        return {
                            buttonDisabled: _hora.buttonDisabled,
                            id: _hora.id,
                            horario_planejado: _hora.horario_planejado
                       } 
                    }
                })
                setHorarioPlanejado(result)
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
                    if (_hora.id === horarios_id) {
                        return {
                            buttonDisabled: true,
                            id: _hora.id,
                            horario_planejado: _hora.horario_planejado
                       } 
                    } else {
                        return {
                            buttonDisabled: _hora.buttonDisabled,
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
    const montarComponente = (horarioPlanejado) => {
        const retorno = horarioPlanejado.map(_hora => (
            <tr>
                <td >{_hora.horario_planejado}</td>
                <td>
                    <MyButton className="button" onClick={onClickEditar} hidden={ishidden} >Alterar</MyButton>
                    <input  className="novoHorario" hidden={ishidden} type="text" name="novo_horario" placeholder="Digite novo horáio" value={nvhorario} onChange={(event) => setNvHorario(event.target.value)} ></input>
                    <button className="button" type="submit" hidden={ishidden} onClick={onClickSalvar} >Salvar</button>
                    <button className="button" type="submit" value={_hora.id} onClick={(event) => onRegistarHorarioMedicacao(event.target.value)} hidden={_hora.buttonDisabled}>  Tomei agora </button>
                </td>
            </tr>
        ))
        return retorno
    }

    const onClickEditar = (event) => {
        setIsHidden(!ishidden)
      }
      const onClickSalvar = (event) => {
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
        <div className="medics">
            {/* <div className="bt_excluir">
                <button className="excluir" type="submit" onClick={props.removerMedicamento}>
                        <img
                            src={iClose}
                            alt="Button Icon"
                            style={{ width: "20px", height: "20px", marginRight: "4px" }}
                        />    
                    </button>
            </div> */}
            <div>
                <section>
                    <div align="center">
                        <td><strong>{props.nome}</strong> {props.dosagem}</td>
                        <td> - ({props.laboratorio})</td>
                    </div>
                    <div align="center">
                        <td>{props.prescricao}</td>
                    </div>
                </section>
            </div>
            <table align="center">
               
                <tr>
                    <td>Estoque:</td>
                    <Quantidade id={props.id} quantidade_estoque={quantidade_estoque}/>
                </tr>
                <tr>
                    <td>Horário:</td>
                    {montarComponente(horarioPlanejado)}
                </tr>
                
            </table>
        </div>
        
        
        
    //    <div className="Medicamento">
    //         <table>
                
    //             {montaTabelaMedicamentos(medicamentos)}
    //             {
    //                  Object.entries(medicamentos).map(_medics => {
    //                     <tr>
    //                         <td><h5>{medicamentos.nome}</h5></td>
    //                         <td>{medicamentos.dosagem}</td>
    //                         <td>{medicamentos.prescricao}</td>
    //                         <td>{medicamentos.laboratorio}</td>
    //                         <Quantidade id={props.id} quantidade_estoque={quantidade_estoque}/>
    //                         {montarComponente(horarioPlanejado)}
    //                     </tr>
                       
    //                 })
    //             }
                
    //         </table>
            
    //         <div>
    //            
    //             <MyButton className="button" onClick={listarDiarioMedicamento}>Listar Diário</MyButton>
    //             <div>
    //                 {list_horarios.map(_horarios => (
    //                 <li>
    //                     Horário: {_horarios.horario}
    //                 </li>
    //                 ))} 
    //             </div>
                
    //         </div>
    //     </div> 
    )
    
};

export default Medicamento;