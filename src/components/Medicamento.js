import './styles/Medicamento.css'
import { useEffect} from "react";
import useMedicamento from "../hooks/useMedicamento";
import { useNavigate } from "react-router-dom";
import Lapis from '../components/icons/Lapis'


const Medicamento = (props) => {
    
    const { medicamento, loading, setLoading, getMedicamento, onRegistarHorarioMedicacao } = useMedicamento(props.medicamento)
    
    const navigate = useNavigate()
    
    useEffect(() => {
        
        if (loading) {
            setLoading(false)
            getMedicamento(props.medicamento.id)
        }
    }
    , [ loading ])

    const montarComponente = (medic) => {
        
        const retorno = medic?.map(_hora => (
            <div>
                <br />
                {'Horário Planejado: ' + _hora.horario_planejado + '    '}
                
                { _hora?.horarios_medicamentos.length === 0 ?
                        <button 
                            className="button" 
                            type="button" 
                            style={{textDecoration: "underline", 
                                color: "#007BFF", 
                                background: "none", 
                                border: "none", 
                                padding: 0, 
                                cursor: "pointer" } }
                            value={_hora?.id} 
                            onClick={(event) => onRegistarHorarioMedicacao(event.target.value)} 
                            >Tomei agora 
                        </button>
                    : _hora?.horarios_medicamentos?.map(_hm =>
                            <span key={_hm.id}>
                                {'Tomado às: ' + (new Date(_hm.updated_at).toLocaleTimeString().slice(0, 5))} <br />
                            </span>
                    )
                }
            </div>
        ))
        return retorno
    }
    const habilitaDesabilita = (ptime) => {
        
        const ndate = 
        new Date(String().concat(new Date().getFullYear(), '-', 
        (new Date().getMonth() + 1), '-', 
        new Date().getDate(), ' ', ptime.horario_planejado))
        
        if (new Date() < ndate ) {
            
            if (ptime.length === 0) {
                return true
            } else if (ptime.length > 0) {
                if (new Date(ptime.updated_at) < ndate) {
                    return true
                } else {
                    return false
                }
            }
        } else if (new Date() > ndate) {

            if (ptime.length === 0) {
                return false

            } else if (ptime.length > 0) {

                const segundoHorario = ptime.length > 1 ? new Date(ptime.updated_at) : new Date(ptime.updated_at)
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
        const { ...medic } = medicamento
        navigate('/cadastrar-medicamentos', { state: { medic: medic } })
    }
    const alertQtdeColor = () => {
        if (medicamento?.quantidade_estoque <= 5) {
            return { color: "red" }
        } else if (medicamento?.quantidade_estoque > 5 && medicamento?.quantidade_estoque <= 10) {
            return { color: "orange" }
        } else {
            return { color: "green" }
        }
    }
    return (
        <div 
            className="medics_title">
            <form className="form_view">
                <div>
                    <div>
                        <h3 style={{ color: "magenta"}}>{medicamento?.nome?.toUpperCase().slice(0, 25) + ' - (' + medicamento?.laboratorio + ')'}</h3>
                    </div>
                    <div>
                        {'Dosagem: ' + medicamento?.dosagem}
                    </div>
                    <div>
                        {'Prescrição: ' + medicamento?.prescricao}
                    </div>
                    <br />
                    <div style={alertQtdeColor()}>
                        {'Estoque restante: ' + medicamento?.quantidade_estoque} unidades
                    </div>
                    <br />
                    <div>
                        {montarComponente(medicamento?.medicamentos_horarios)}  
                    </div>
                </div>

            </form>
            
            <div>
                <button
                    className="bt_icon"
                    onClick={handleEdit} 
                    >
                    <Lapis tamanho={20} cor="#007BFF"></Lapis>
                </button>
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