import React from "react";
import Medicamento from "./Medicamento";
import { useLocation } from "react-router-dom";
//import useMedicamentos from "../hooks/useMedicamentos";
import './styles/ListarMedicamentos.css'
import MyButton from "../hooks/MyButton";
import { useNavigate } from "react-router-dom";
import useMedicamentos from "../hooks/useMedicamento";

function ListarMedicamentos(props) {
    const location = useLocation();
    const navigate = useNavigate()
    const { id, medicamentos } = location.state || {};
    const [medicamento, , , getMedicamentos, , , , , habilitaDesabilita] = useMedicamentos(medicamentos)
    const removerMedicamento = (key) => {
        if (window.confirm`Tem certeza que deseja remover o medicamento ${key.nome} ?`) {
            const payLoad = { status: 1 }
            fetch(`http://192.168.0.152:3001/medicamentos/${key.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payLoad)
            }).then(result => {
                if (result.ok) {
                    //let medic = medicamentos.filter(m => m !== key)
                    //setListMedicamentos(medic)
                    alert(`Medicamento ${key.nome} excluido com sucesso. `)
                    return payLoad.id
                }
            })
        }
    }


    return (
        <div className="ListaMedicamentos">
            {
                medicamento.map(_medic => (
                    !habilitaDesabilita(_medic) ?
                        <Medicamento
                            className="medicamento"
                            medicamento={_medic}
                            removerMedicamento={() => removerMedicamento(_medic)}
                        />
                        : null
                ))
            }
            <MyButton className="formButton" onClick={() => (navigate(-1))} >Retornar</MyButton>
        </div>

    )
}

export default ListarMedicamentos