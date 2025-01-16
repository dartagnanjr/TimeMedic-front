import React from "react";
import Medicamento from "./Medicamento";
import { useLocation } from "react-router-dom";
//import useMedicamentos from "../hooks/useMedicamentos";
import './ListaMedicamentos.css'

function ListarMedicamentos (props){
    const location = useLocation();
    const { id, medicamentos } = location.state || {};
      
    const removerMedicamento = (key) => {
        if (window.confirm`Tem certeza que deseja remover o medicamento ${key.nome} ?`) {
            const payLoad = { status: 1 }
            fetch(`http://192.168.0.152:3001/medicamentos/${key.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(payLoad)
            }).then(result => {
                if (result.ok) {
                    //let medic = medicamentos.filter(m => m !== key)
                    //setListMedicamentos(medic)
                    alert(`Medicamento ${key.nome } excluido com sucesso. `)
                    return payLoad.id
                } 
            })
        }
    }

    
    return (
        <div align="center">
            {medicamentos.map(_medic => (
                <Medicamento
                    id={_medic.id}
                    nome={_medic.nome}
                    dosagem={_medic.dosagem}
                    prescricao={_medic.prescricao}
                    laboratorio={_medic.laboratorio}
                    horario_planejado={_medic.medicamentos_horarios}
                    quantidade_estoque={ { id: _medic.id, quantidade_estoque: _medic.quantidade_estoque } }
                    removerMedicamento={() => removerMedicamento(_medic)}
                />
            ))}

        </div>
        
    )
}

export default ListarMedicamentos