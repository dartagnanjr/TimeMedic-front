import React from "react";
import './ListaMedicamentos.css'

export default (props) => 
    <div>
        <ul>
            <li>{props.nome} </li>
            <li>{props.dosagem}</li>
            <li>{props.laboratorio}</li>
        </ul>
    </div>