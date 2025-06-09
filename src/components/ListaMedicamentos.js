import './styles/ListaMedicamentos.css'

const ListaMedicamentos = (props) => (
    <tr>
        <td>{props.nome.substring(0, 30)}</td>
        <td align="left">{props.laboratorio}</td>
        <td align="right">{props.dosagem}</td>
        <td align="right">{props.qtde}</td>
        <td align="center">{props.hr_marcada}</td>
        <td align="center">{props.ult_horario}</td>
    </tr>
)

export default ListaMedicamentos;