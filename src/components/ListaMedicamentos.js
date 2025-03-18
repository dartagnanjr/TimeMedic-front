import React from "react";
import './styles/ListaMedicamentos.css'

export default (props) =>
    <tr>
        <td>{props.nome} ({props.laboratorio})</td>
        <td align="center">{props.dosagem}</td>
        <td align="center">{props.qtde}</td>
        <td align="center">{props.hr_marcada}</td>
        <td align="center">{props.ult_horario}</td>
    </tr>
