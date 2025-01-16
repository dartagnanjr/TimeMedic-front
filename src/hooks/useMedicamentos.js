// import React, { useState } from "react";
// import api from '../services/api'

function useMedicamentos  () {
    const [ medicamentos, setMedics ] = useState([])

    //const medicamento = api.get('/medicamentos/pessoa/', {id: pessoaId })

    const setMedicamentos = async (medicamento) => {

        const result = medicamento.map((_medic) =>{

            function response () {
                let con = [];
                if (Array.isArray(_medic.medicamentos_horarios)){
                    _medic.medicamentos_horarios.map(result => {
                        return con.push({
                            horario_planejado: result.horario_planejado,
                            id: result.id,
                            buttonDisabled: false
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
                quantidade_estoque: _medic.quantidade_estoque,
                horario_planejado: resultado 
            }
        })
       return result
    }
    setMedicamentos(medicamentos)

    return {
        medicamentos,

        setMedicamentos
    }

}

export default useMedicamentos