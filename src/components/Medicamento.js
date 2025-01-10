import React, { useState, useEffect} from "react";
import './Medicamento.css'
import HorarioDiario from "./HorarioDiario";
import { formatarData } from "../util/dates";
import iClose from "../images/close.png"
import Horario from "./Horario";
import Quantidade from "./Quantidade";

const Medicamento = (props) => {
     const [ list_horarios, setListHorarios ] = useState([])
     const [ id, setId ] = useState(props.quantidade_estoque.id)
     const [ quantidade_estoque, setQuantidadeEstoque ] = useState(props.quantidade_estoque.quantidade_estoque)
    const [ isDisable, setIsDisable ] = useState(false)
    
    useEffect(() => {
        fetch(`http://192.168.0.152:3001/medicamento/diario/${props.id}`, {
          method: 'GET'
        })
        .then(result => result.json()
        )
        .then(dados => {
            if (dados){
              setIsDisable(true);
            }
        })
    }, [])

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

    const onRegistarHorarioMedicacao = (horario_id) => {
        const horario = { horarios_id: horario_id }
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
                setIsDisable(true);
                alert(`Horário gravado com sucesso.`)
              } else {
                alert("Erro gravando o horário.");
              }
            })
            .catch((error) => console.error("Erro gravando o horário: ", error));
    }

    return (
       <div className="Medicamento">
            
            <ul>
                <h3>{props.nome}</h3>
                <li>Dosagem: {props.dosagem}</li>
                <li>Prescrição: {props.prescricao}</li>
                <li>Laboratório: {props.laboratorio}</li>
                <Quantidade id={id} quantidade_estoque={quantidade_estoque} />
                {props.horario_planejado.map(_hora => (
                    <Horario
                        horario={_hora.horario_planejado}
                        id={_hora.id}
                        isButtonDisabled={isDisable}
                        onButtonClick={() => onRegistarHorarioMedicacao(_hora.id)}
                    />
                ))} 
                <div>
                    <button className="excluir" type="submit" onClick={props.removerMedicamento}>
                        <img
                            src={iClose}
                            alt="Button Icon"
                            style={{ width: "20px", height: "20px", marginRight: "4px" }}
                        />    
                    </button>
                    <button className="Listar" type="submit" onClick={listarDiarioMedicamento} >Listar diário</button>
                    <div>
                       {list_horarios.map(_horarios => (
                        <HorarioDiario
                            horario_diario={_horarios.horario}
                        />
                        ))} 
                    </div>
                    
                </div>
            </ul>
        </div> 
    )
    
};

export default Medicamento;