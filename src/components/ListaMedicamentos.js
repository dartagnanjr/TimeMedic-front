import React from "react";
import './ListaMedicamentos.css'

export default (props) => 
    <tr>
        <td>{props.nome} ({props.laboratorio})</td>
        <td align="right">{props.dosagem}</td>
    </tr>
    