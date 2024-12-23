import React from "react";

const Medicamento = (props) => (
    <div className="Medicamento">
        <ul>
            <p> {props.key}</p>
            <h3>Nome: {props.nome} </h3>
            <li><strong>Dosagem</strong> {props.dosagem}</li>
            <li><strong>Prescrição</strong> {props.prescricao}</li>
            <li><strong>Laboratório</strong> {props.laboratorio}</li>
        </ul>
    </div>
);

export default Medicamento;