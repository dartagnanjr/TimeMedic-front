// import api from '../services/api'
import React, { useState } from "react";
import api from "../services/api";
import { formatarData } from '../util/dates'


function useMedicamento  (medic) {
    const [ medicamento, setMedic  ] = useState(medic)
    
    
    // const getMedicamento = () => {
    //     api.get('/medicamentos/pessoa/', )
    // }

    const setMedicamento = async (medics) => {
        setMedic(medics)
    }

    const onRegistarHorarioMedicacao = (horarios_id) => {

        const horario = { horarios_id: horarios_id }
        fetch('http://192.168.0.152:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(horario)
        })
        .then((result) => result.json())
            .then((dados) => {
            if (dados.id) {

                atualizaObj(dados)

                alert(`Horário gravado com sucesso.`)
            } else {
                alert("Erro gravando o horário.");
            }
            })
            .catch((error) => console.error("Erro gravando o horário: ", error));
        
    }

    const atualizaObj = (dados) => {

        const medicamentoAtualizado = medicamento.map(_horarios => {

            const horariosAtualizados = _horarios.medicamentos_horarios.map(_regs => {

                if (_regs.id === dados.horarios_id) {
                  
                    return { ..._regs, horarios_medicamentos: [ dados ] }

                } else {
                    return { ..._regs }
                }
              });
            
            return { ..._horarios, medicamentos_horarios: horariosAtualizados }; // Atualiza a pessoa

          });
          
          setMedic(medicamentoAtualizado)
          
          
    }

    
    
    return [
        medicamento,

        setMedicamento,
        onRegistarHorarioMedicacao
    ]

}

export default useMedicamento