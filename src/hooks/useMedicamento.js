// import api from '../services/api'
import { useState } from "react";
import api from "../services/api";


function useMedicamento  (medic) {
    const [ medicamento, setMedic  ] = useState(medic)
    
    
    const setMedicamento = (medics) => {
        setMedic(medics)
    }

    const setNovoMedicamento = async (params) => {
        
        const medic = { 
            nome: params[0].nome, 
            dosagem: params[0].dosagem, 
            prescricao: params[0].prescricao, 
            laboratorio: params[0].laboratorio, 
            quantidade_estoque: params[0].quantidade_estoque, 
            pessoa_id: params[0].pessoa_id }

        const ret = await api.post('/medicamentos', params[0].id, medic)
        setMedic(ret)
    }

    const setUpdateMedicamento = async (params, id) => {
        const ret = await api.put('/medicamentos/', id, '', params)
        setMedic(ret)
        return ret
    }

    const createMedicamento = async (params) => {
        const ret = await api.post('/medicamentos', '', '', params)
        return ret[0].id
    }

    const getMedicamento = async () => {
        const ret = await api.get('/medicamentos/', medicamento[0].id)
        setMedic(ret)       
     }

     const createHorarioMedicamento = async (params) => {
        const ret = await api.post('/horarios', '', '', params)
        return ret
     }

     const updateHorarioMedicamento = async (params, id) => {
        const ret = await api.put('/horarios', id, '', params)
        return ret
     }

    const onRegistarHorarioMedicacao = async (horarios_id) => {

        const response = await api.post('/register', '', '', { horarios_id: horarios_id })
        if (!response) {
            alert("Erro gravando o horário.");
            return
        }
        getMedicamento()
        alert(`Horário gravado com sucesso.`)
        return
        const horario = { horarios_id: horarios_id }
        fetch('http://192.168.0.152:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(horario)
        })
        .then((result) => result.json())
            .then((dados) => {
            if (dados.id) {

                getMedicamento()
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
        onRegistarHorarioMedicacao,
        getMedicamento,
        setUpdateMedicamento,
        createMedicamento,
        createHorarioMedicamento,
        updateHorarioMedicamento
    ]

}

export default useMedicamento