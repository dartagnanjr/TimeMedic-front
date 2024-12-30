import React from "react";
import './Medicamento.css'

const Medicamento = (props) => {
    
    return (
       <div className="Medicamento">
            <ul>
                <p> {props.key}</p>
                <h3>Nome: {props.nome} </h3>
                <li><strong>Dosagem: </strong> {props.dosagem}</li>
                <li><strong>Prescrição: </strong> {props.prescricao}</li>
                <li><strong>Laboratório: </strong> {props.laboratorio}</li>
                {props.horario_planejado}

                <div>
                    <button className="excluir" type="submit" onClick={props.removerMedicamento}>&times;</button>
                </div>
            </ul>
        </div> 
    )
    
};

export default Medicamento;