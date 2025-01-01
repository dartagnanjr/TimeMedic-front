import React, { useState, useEffect } from "react";
import Medicamento from "./Medicamento";
import { useLocation } from "react-router-dom";
import Horario from "./Horario";

function ListarMedicamentos (){
    const location = useLocation();
    const { id } = location.state || {};

    const [ medicamentos, setMedicamentos ] = useState([])
   

    useEffect (()=> {
        const url = `http://192.168.0.152:3001/medicamentos/pessoa/${id}`
        fetch(url, { 
            method: "GET",
            })
            .then((response) => {
                if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
                }
                return response.json();
            })
            .then((dados) => {
                if (dados) {
                    const result = dados.map((_medic) =>{

                        function response () {
                            let con = [];
                            if (Array.isArray(_medic.medicamentos_horarios)){
                                _medic.medicamentos_horarios.map(result => {
                                    return con.push({
                                        horario_planejado: result.horario_planejado,
                                        id: result.id
                                    })
                                })
                            }
                            return con
                        }
                        const resultado = response()
                        return {
                            id: _medic.id,
                            nome: _medic.nome,
                            dosagem: _medic.dosagem,
                            prescricao: _medic.prescricao,
                            laboratorio: _medic.laboratorio,
                            horario_planejado: resultado 
                        }
                    })
                    setMedicamentos(result);
                } else {
                    throw new Error('Nenhum registro encontrado.')
                }
            })
            .catch((error) => console.error("Erro ao buscar pessoas:", error));
    }, [id])

    const removerMedicamento = (key) => {
        if (window.confirm`Tem certeza que deseja remover o medicamento ${key.nome} ?`) {
            const payLoad = { status: 1 }
            fetch(`http://192.168.0.152:3001/medicamentos/${key.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(payLoad)
            }).then(result => {
                if (result.ok) {
                    let medic = medicamentos.filter(m => m !== key)
                    setMedicamentos(medic)
                    alert(`Medicamento ${key.nome } excluido com sucesso. `)
                    return payLoad.id
                } 
            })
        }
    }

    

    return (
        <div>
            {medicamentos.map(_medic => (
                    <Medicamento
                        id={_medic.id}
                        nome={_medic.nome}
                        dosagem={_medic.dosagem}
                        prescricao={_medic.prescricao}
                        laboratorio={_medic.laboratorio}
                        horario_planejado={
                            _medic.horario_planejado.map(_hora => (
                                <Horario
                                    horario={_hora.horario_planejado}
                                    id={_hora.id}
                                />
                            ))
                        }
                        removerMedicamento={() => removerMedicamento(_medic)}
                    />
                ))}
            
        </div>
        
    )
}

export default ListarMedicamentos