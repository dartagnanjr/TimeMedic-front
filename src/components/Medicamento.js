import React, { useState } from "react";
import './Medicamento.css'
import HorarioDiario from "./HorarioDiario";
import { formatarData } from "../util/dates";
import iClose from "../images/close.png"



const Medicamento = (props) => {
     const [ list_horarios, setListHorarios ] = useState([])

    const listarDiarioMedicamento = (event) => {
        event.preventDefault()

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
    }

    return (
       <div className="Medicamento">
            {/* <img src={iOlmMedo} alt="Button Icon" style={{ width: "100px", height: "100px", marginRight: "4px"}} >
            </img> */}
            <ul>
                <h3>Nome: {props.nome} 
                    
                </h3>
                <li>Dosagem: {props.dosagem}</li>
                <li>Prescrição: {props.prescricao}</li>
                <li>Laboratório: {props.laboratorio}</li>
                {props.horario_planejado}
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