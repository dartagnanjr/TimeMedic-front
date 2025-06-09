// import api from '../services/api'medicamentos
import { useState } from "react";
import api from "../services/api";


function useMedicamento(medic) {
    
    const [medicamento, setMedic] = useState(medic.length > 0 ? [] : medic )
    const [medicamentos, setMedicamentosData] = useState(medic)
    const [ loading, setLoading ] = useState(false)

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

    const getMedicamento = async (medicamento_id) => {
        const ret = await api.get('/medicamentos/', medicamento_id)
        setMedic(...ret)
    }
    const destroyMedicamento = async (medicamento) => {
        if (window.confirm(`Tem certeza que deseja remover o medicamento ${medicamento.nome} ?`)) {
            const ret = await api.delete('/medicamentos/', medicamento.id)
            if (ret) {
                alert(`Medicamento ${medicamento.nome} excluído com sucesso.`)
                setMedicamentosData(medicamentos.filter(med => med.id !== medicamento.id))
            }
            else {
                alert(`Problemas ao excluir o medicamento ${medicamento.nome}.`)
            }
            return ret
        }
        return false
    }
    const destroyHorarioMedicamento = async (id) => {
        
        const ret = await api.delete('/medicamento/horarios/', id)
        if (ret) {
            alert(`Medicamento ${medicamento.nome} excluído com sucesso.`)
            setMedicamentosData(medicamentos.filter(med => med.id !== id))
        } else {
            alert(`Problemas ao excluir o medicamento ${medicamento.nome}.`)
        }
        return ret
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
            return Error("Erro gravando o horário.");
        }
        getMedicamento(medicamento.id)
        alert(`Horário gravado com sucesso.`)
        return

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


    return {
        medicamento,
        medicamentos,
        loading, 
        
        setLoading,
        setMedicamento,
        onRegistarHorarioMedicacao,
        getMedicamento,
        getMedicamentos,
        setUpdateMedicamento,
        setMedicamentos,
        createMedicamento,
        createHorarioMedicamento,
        updateHorarioMedicamento,
        habilitaDesabilita,
        destroyHorarioMedicamento,
        destroyMedicamento
    }

}

export default useMedicamento