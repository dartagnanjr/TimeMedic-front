import React, { useEffect } from "react";
import './styles/Medicamento.css'
import MyButton from "../hooks/MyButton";
import useMedicamento from "../hooks/useMedicamento";
import { useNavigate } from "react-router-dom";
import Lapis from '../components/icons/Lapis'


const Medicamento = (props) => {
    const [ medicamento, setMedicamento, onRegistarHorarioMedicacao, getMedicamento ] = useMedicamento([ props.medicamento ])
    const navigate = useNavigate()
    useEffect(() => {
        getMedicamento()
    }, [ ])

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
                                new Date(_hora.horarios_medicamentos[1].updated_at).toLocaleTimeString() : 
                                new Date(_hora.horarios_medicamentos[0].updated_at).toLocaleTimeString()) 
                        : null}
                    </div>
                        
            </div>
        ))
        return retorno
    }
    const habilitaDesabilita = (ptime) => {
        
        const ndate = new Date(String().concat(new Date().getFullYear(), '-', (new Date().getMonth() + 1), '-', new Date().getDate(), ' ', ptime.horario_planejado))

        if (new Date() < ndate ) {
            
            if (ptime.horarios_medicamentos.length === 0) {
                return true
            } else if (ptime.horarios_medicamentos.length > 0) {
                if (new Date(ptime.horarios_medicamentos[0].updated_at) < ndate) {
                    return true
                } else {
                    return false
                }
            }
        } else if (new Date() > ndate) {

            if (ptime.horarios_medicamentos.length === 0) {
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
        navigate('/cadastrar-medicamentos', { state: { medic: medicamento } })
    }
    return (
        <div 
            className="medics_title">
            <div align="center">
                <td>
                    <td>
                        <b>
                            <a href="">{medicamento[0].nome.toUpperCase()}</a>
                        </b>
                    </td> 
                    <br />
                    <td>{medicamento[0].dosagem} - ({medicamento[0].laboratorio})</td>  
                </td>
                <div align="center" className="div_dosagem">
                    <td>{medicamento[0].prescricao}</td>
                </div>
            </div>
            <div className="controles">
                <div className="label_horario" >
                        Horário:
                    <div className="horarios">
                        {montarComponente(medicamento[0].medicamentos_horarios)}
                    </div>
                </div>
                <div className="qtde">
                        Estoque:
                    <div className="horarios">
                        {medicamento[0].quantidade_estoque}
                    </div>
                </div>
            </div>
            <div>
                <MyButton
                    className="bt_icon"
                    onClick={handleEdit} 
                    >
                    <Lapis tamanho={20} cor="#007BFF"></Lapis>
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
                
            
            
            
        
        
    )
    
};

export default Medicamento;