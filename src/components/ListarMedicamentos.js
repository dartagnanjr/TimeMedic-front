import React from "react";
import Medicamento from "./Medicamento";
import { useLocation } from "react-router-dom";
//import useMedicamentos from "../hooks/useMedicamentos";
import './styles/ListarMedicamentos.css'
import MyButton from "../hooks/MyButton";
import { useNavigate } from "react-router-dom";
import useMedicamentos from "../hooks/useMedicamento";
import api from "../services/api";

function ListarMedicamentos(props) {
    
    const location = useLocation();
    const navigate = useNavigate()
    const { medicamentos } = location.state || {};
    const {medicamento, habilitaDesabilita} = useMedicamentos(medicamentos.sort((a, b) => a.medicamentos_horarios?.map(_h => _h.horario_planejado.localeCompare(b.medicamentos_horarios?.horario_planejado))))
    
    

    const removerMedicamento = (key) => {
        if (window.confirm`Tem certeza que deseja remover o medicamento ${key.nome} ?`) {
            const payLoad = { status: 1 }
            const result = api.put('/medicamentos/', key.id, payLoad)
            if (result.ok) {
                //let medic = medicamentos.filter(m => m !== key)
                //setListMedicamentos(medic)
                alert(`Medicamento ${key.nome} excluido com sucesso. `)
                return payLoad.id
            }
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