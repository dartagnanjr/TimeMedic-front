// import api from '../services/api'
import { useState } from "react";
import api from "../services/api";


function useMedicamento(medic) {
    const [medicamento, setMedic] = useState(medic)


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
            pessoa_id: params[0].pessoa_id
        }

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
        const ret = await api.put('/horarios/', id, '', params)
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

    const atualizaObj = (dados) => {

        const medicamentoAtualizado = medicamento.map(_horarios => {

            const horariosAtualizados = _horarios.medicamentos_horarios.map(_regs => {

                if (_regs.id === dados.horarios_id) {

                    return { ..._regs, horarios_medicamentos: [dados] }

                } else {
                    return { ..._regs }
                }
            });

            return { ..._horarios, medicamentos_horarios: horariosAtualizados }; // Atualiza a pessoa

        });

        setMedic(medicamentoAtualizado)


    }

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


    return [
        medicamento,

        setMedicamento,
        onRegistarHorarioMedicacao,
        getMedicamento,
        setUpdateMedicamento,
        createMedicamento,
        createHorarioMedicamento,
        updateHorarioMedicamento,
        habilitaDesabilita
    ]

}

export default useMedicamento