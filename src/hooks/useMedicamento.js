// import api from '../services/api'medicamentos
import { useState } from "react";
import api from "../services/api";


function useMedicamento(medic) {
    
    const [medicamento, setMedic] = useState(medic)
    const [medicamentos, setMedicamentosData] = useState([])

    const getMedicamentos = async (id) => {
        const dados = await api.get('/medicamentos/pessoa/', id)
        setMedicamentosData(dados)
        return dados
    }

    const setMedicamentos = (dados) => {
        setMedicamentosData(dados)
        return dados
    }

    const setMedicamento = (medics) => {
        setMedic(medics)
    }

    const setUpdateMedicamento = (params, id) => {
        const ret = api.put('/medicamentos/', id, '', params)
        setMedic(ret)
        return ret
    }

    const createMedicamento = async (params) => {
        const ret = await api.post('/medicamentos', '', '', params)
        return ret.id
    }

    const getMedicamento = async () => {
        const ret = await api.get('/medicamentos/', medicamento[0].id)
        setMedic(ret)
    }

    const createHorarioMedicamento = (params) => {
        const ret = api.post('/horarios', '', '', params)
        return ret
    }

    const updateHorarioMedicamento = (params, id) => {
        const ret = api.put('/horarios/', id, '', params)
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

    }

    // const atualizaObj = (dados) => {

    //     const medicamentoAtualizado = medicamento.map(_horarios => {

    //         const horariosAtualizados = _horarios.medicamentos_horarios.map(_regs => {

    //             if (_regs.id === dados.horarios_id) {

    //                 return { ..._regs, horarios_medicamentos: [dados] }

    //             } else {
    //                 return { ..._regs }
    //             }
    //         });

    //         return { ..._horarios, medicamentos_horarios: horariosAtualizados }; // Atualiza a pessoa

    //     });

    //     setMedic(medicamentoAtualizado)


    // }

    const habilitaDesabilita = (ptime) => {

        const ndate = new Date(String().concat(new Date().getFullYear(), '-',
            (new Date().getMonth() + 1), '-', new Date().getDate(), ' ',
            ptime.medicamentos_horarios?.map(_mh => _mh.horario_planejado)))

        if (new Date() < ndate) {

            if (ptime.medicamentos_horarios?.map(_mh => _mh.horarios_medicamentos.length) === 0) {
                return true
            } else if (ptime.medicamentos_horarios?.map(_mh => _mh.horarios_medicamentos.length) > 0) {
                if (new Date(ptime.medicamentos_horarios?.map(_mh => _mh.horarios_medicamentos?.map(_hm =>
                    _hm.updated_at))) < ndate) {
                    return true
                } else {
                    return false
                }
            }
        } else if (new Date() > ndate) {

            if (ptime.medicamentos_horarios?.map(_mh => _mh.horarios_medicamentos.length) === 0) {
                return false

            } else if (ptime.medicamentos_horarios?.map(_mh => _mh.horarios_medicamentos.length) > 0) {

                const segundoHorario = ptime.medicamentos_horarios?.map(_mh => _mh.horarios_medicamentos.length) > 1 ?
                    new Date(ptime.medicamentos_horarios?.map(_mh => _mh.horarios_medicamentos?.map(_hm => _hm.updated_at))) :
                    new Date(ptime.medicamentos_horarios?.map(_mh => _mh.horarios_medicamentos?.map(_hm => _hm.updated_at)))
                if (segundoHorario > ndate) {
                    return true
                } else if (segundoHorario < ndate) {
                    return false
                } else {
                    return false
                }
            }
        }

    }


    return {
        medicamento,
        medicamentos,

        setMedicamento,
        onRegistarHorarioMedicacao,
        getMedicamento,
        getMedicamentos,
        setUpdateMedicamento,
        setMedicamentos,
        createMedicamento,
        createHorarioMedicamento,
        updateHorarioMedicamento,
        habilitaDesabilita
    }

}

export default useMedicamento