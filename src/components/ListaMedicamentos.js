import React from "react";
import './styles/ListaMedicamentos.css'

export default (props) => 
    <tr>
        <td>{props.nome} ({props.laboratorio})</td>
        <td align="right">{props.dosagem}</td>
        <td align="right">{props.qtde}</td>
    </tr>
    