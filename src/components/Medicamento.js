import React, { useState, useEffect } from "react";
import './Medicamento.css'
import { formatarData } from '../util/dates'
import MyButton from "../hooks/MyButton";
import api from '../services/api'
import useMedicamento from "../hooks/useMedicamento";
import { useNavigate } from "react-router-dom";


const Medicamento = (props) => {
    const [ list_horarios, setListHorarios ] = useState([])
    const [ ishidden, setIsHidden ] = useState(true);
    const [ nvhorario, setNvHorario ] = useState('00:00:00')
    const [ medicamento, setMedicamento, onRegistarHorarioMedicacao ] = useMedicamento([ props.medicamento ])
    const navigate = useNavigate()
    
    const montarComponente = (medic) => {
        const retorno = medic.map(_hora => (
            <div>
                {_hora.horario_planejado}
                    <div>
                        <button 
                            className="button" 
                            type="submit" 
                            value={_hora.id} 
                            onClick={(event) => onRegistarHorarioMedicacao(event.target.value)} 
                            hidden={habilitaDesabilita(_hora) ? true : false}>
                                Tomei agora 
                        </button>
                    </div> 
                    <div>
                        {_hora.horarios_medicamentos.length > 0 ? 
                            (_hora.horarios_medicamentos.length > 1 ? 
                                new Date(_hora.horarios_medicamentos[1].created_at).toLocaleTimeString() : 
                                new Date(_hora.horarios_medicamentos[0].created_at).toLocaleTimeString()) 
                        : null}
                    </div>
                        
            </div>
        ))
        return retorno
    }
    const habilitaDesabilita = (ptime) => {

        const ndate = new Date(String().concat(new Date().getFullYear(), '-', (new Date().getMonth() + 1), '-', new Date().getDate(), ' ', ptime.horario_planejado))

        if (new Date() < ndate ) {
            
            if (ptime.horarios_medicamentos.length == 0) {
                return true
            } else if (ptime.horarios_medicamentos.length > 0) {
                if (new Date(ptime.horarios_medicamentos[0].updated_at) < ndate) {
                    return true
                } else {
                    return false
                }
            }
        } else if (new Date() > ndate) {

            if (ptime.horarios_medicamentos.length == 0) {
                return false

            } else if (ptime.horarios_medicamentos.length > 0) {

                const segundoHorario = ptime.horarios_medicamentos.length > 1 ? new Date(ptime.horarios_medicamentos[1].updated_at) : new Date(ptime.horarios_medicamentos[0].updated_at)
                if (segundoHorario > ndate) {
                    return true
                } else if (segundoHorario < ndate) {
                    return false
                } else {
                    return false
                }
            }
        }  
        
    }
    const handleEdit = () => {
        navigate('/cadastrar-medicamentos', { state: { medicamento: medicamento } })
    }
    return (
        <div className="medics">
            <div>
                <div 
                    className="medics_title">
                    <div align="center">
                        <td>
                            <strong>
                                {medicamento[0].nome}
                            </strong> 
                                {medicamento[0].dosagem}</td>
                        <td> - ({medicamento[0].laboratorio})</td>
                        <div align="center">
                            <td>{medicamento[0].prescricao}</td>
                        </div>
                    </div>
                    <div className="controles">
                        <div className="label_horario" >
                            <strong>
                                Horário:
                            </strong>
                            <div className="horarios">
                                {montarComponente(medicamento[0].medicamentos_horarios)}
                            </div>
                        </div>
                        <div className="qtde">
                            <strong>
                                Estoque:
                            </strong>
                            <div className="horarios">
                                {medicamento[0].quantidade_estoque}
                            </div>
                        </div>
                    </div>
                    <div>
                        <MyButton
                            className="formButton"
                            onClick={handleEdit} 
                            >
                            Editar
                        </MyButton>
                    </div>
                    <div >
                        <button 
                            className="bt_excluir"
                            type="submit" 
                            onClick={props.removerMedicamento} 
                            hidden={false}>
                            &times;
                        </button>
                    </div>
                </div>
                
            </div>
            
            
        </div>
        
    )
    
};

export default Medicamento;