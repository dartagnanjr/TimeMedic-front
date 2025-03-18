import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './styles/CadastrarMedicamento.css'
import useMedicamento from "../hooks/useMedicamento";
import MyButton from "../hooks/MyButton";
import Horario from "./Horario";


function CadastrarMedicamento (props) {
    const navigate = useNavigate();
    const location = useLocation();
    let { medic } = location.state || { medic: [{}] };
    const [ ishidden, setIsHidden ] = useState(true)
    const [ horario, setHorario ] = useState([])
    const [ novo_id, setNovoId ] = useState('')
    const [ medicamento, setMedicamento,,, setUpdateMedicamento, createMedicamento, createHorarioMedicamento, updateHorarioMedicamento ] = useMedicamento(medic)
    const [mostrarComponente, setMostrarComponente] = useState(false);
    

    const onSubmitGravarMedicmentoHandler = async (event) => {
        event.preventDefault();
        const id = medicamento[0].id
        const medic = { 
                nome: medicamento[0].nome, 
                dosagem: medicamento[0].dosagem, 
                prescricao: medicamento[0].prescricao, 
                laboratorio: medicamento[0].laboratorio, 
                quantidade_estoque: medicamento[0].quantidade_estoque, 
                pessoa_id: medicamento[0].pessoa_id }
    
        if (medicamento[0].id) {
            const ret = await setUpdateMedicamento(medic, id)
            if (!ret) {
                alert('Problemas ao atualizar medicamento.')
                return
            }
            const response = medicamento[0].medicamentos_horarios.map(async _hor => {
                console.log(_hor, _hor.id)
                return await updateHorarioMedicamento({ horario_planejado: _hor.horario_planejado }, _hor.id)
            })
            console.log(response)
            if (!response) {
                alert('Problemas ao atualizar horário do medicamento.')
                return
            }
            //const horario = await updateHorarioMedicamento()
            alert(String().concat('Medicamento ', medicamento[0].name, ' atualizado com sucesso.'))
            navigate(-1)
        } else {
            if (medicamento[0].medicamentos_horarios.length === 0) {
                alert('Adicione pelo menos um horário para o medicamento.')
                return
            }
            const nv_medicamentoId = await createMedicamento(medic)
            if (!nv_medicamentoId) {
                alert('Problemas criando novo medicamento.')
                return
            }
            const horarios = horario.map(_x => {
                return {
                    medicamento_id: nv_medicamentoId,
                    horario_planejado: String().concat(_x, ':00'),
                    status: 0
                }
            })
            const ret = await createHorarioMedicamento(...horarios)
            if (!ret){ 
                alert('Problemas ao registrar horario do medicamento.')
                return
            }
            console.log(ret)
            alert(`Medicamento ${medicamento[0].nome} cadastrado com sucesso.`)
            navigate(-1)
        }
        return
        
    }
    const onSubmitGravarHorarioHandler = (event) => {
        event.preventDefault();
        if (window.confirm`Confirma a inclusão do horário ${horario} ?`) {

            const horarios = { medicamento_id: novo_id, horario_planejado: horario, status: 0 }

            fetch('http://192.168.0.152:3001/horarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(horarios),
            })
                .then((result) => {
                    if (!result.ok){
                        alert(`Não foi possivel gravar o novo horário: ${result.error} `)
                        throw new Error(result.error)
                    }
                    return result.json()
                })
                .then((dados) => {
                if (dados) {
                    alert(`Horário ${horario} gravado com sucesso para o medicamento ${medicamento[0].nome}`)
                    if (window.confirm`Deseja incluir outro horário ?`) {
                        setHorario('00:00:00')
                    }   else {
                        setHorario('')
                        setIsHidden(true)
                    }
                } else {
                    alert("Problemas ao gravar horário do medicamento.");
                }
                })
                .catch((error) => console.error("Erro na autenticação:", error));
        }
    }
    const onSubmitChanges = (key, newValue) => {

        try {
            const updatedMedicament = [ { ...medicamento[0], [key]: newValue } ];
            setMedicamento(updatedMedicament);
        } catch (error) {
            throw new Error(error)
        }
       
    }

    const remRegister = (id) => {
        medicamento[0].medicamentos_horarios = medicamento[0].medicamentos_horarios.filter(_hor => _hor.id !== id) 
        setMostrarComponente(!mostrarComponente)
    }

    const addRegister = () => {
        const id = medicamento[0].medicamentos_horarios.length + 1
        medicamento[0].medicamentos_horarios.push({ id: id })
        setMostrarComponente(!mostrarComponente)
    }

    const addHorario = (hora, pId) => {
        const nv_horario = medicamento[0].medicamentos_horarios.filter(_f => _f.id == pId)
        .map(_hor => {
            return { ..._hor, horario_planejado: hora}
        })
        const nv_medicamento = { ...medicamento[0], medicamentos_horarios: nv_horario }
        setMedicamento([nv_medicamento]) 
        
        //setHorario([hora])
  
    }

    return (
        <div className="form_input">
            
            <form  onSubmit={onSubmitGravarMedicmentoHandler}>
            <h4>Cadastrar Medicamento</h4>
                <label>Nomesssss: </label>
                <input 
                    type="text" 
                    name="nome" 
                    placeholder="Digite o nome do remédio" 
                    value={medicamento[0].nome} 
                    onChange={(event) => onSubmitChanges('nome', event.target.value)} 
                    required />
                <label>Dosagem:  </label>
                <input 
                    type="text" 
                    name="dosagem" 
                    placeholder="Digite a dosagem do remédio" 
                    value={medicamento[0].dosagem} 
                    onChange={(event) => onSubmitChanges('dosagem', event.target.value)} 
                    required />
                <label>Prescrição:  </label>
                    <input 
                    type="text" 
                    name="prescricao" 
                    placeholder="Digite a prescicao do remédio" 
                    value={medicamento[0].prescricao} 
                    onChange={(event) => onSubmitChanges('prescricao', event.target.value)} />
                <label>Laboratório:  </label>
                <input 
                    type="text" 
                    name="laboratorio" 
                    placeholder="Digite o laboratorio do remédio" 
                    value={medicamento[0].laboratorio} 
                    onChange={(event) => onSubmitChanges('laboratorio', event.target.value)} />

                <label>Estoque:  </label>
                <input 
                    type="number" 
                    name="quantidade" 
                    placeholder="Digite a quantidade do remédio em estoque" 
                    value={medicamento[0].quantidade_estoque} 
                    onChange={(event) => onSubmitChanges('quantidade_estoque', event.target.value)} />
                <button type="button" 
                        onClick={addRegister}>+</button>

                {mostrarComponente ? medicamento[0].medicamentos_horarios.map(_hor => (
                <>
                    <label>Horário: </label>
                    <Horario id={medicamento[0].id} 
                            nome={medicamento[0].nome} 
                            horarioId={_hor.id}
                            horario_planejado={_hor.horario_planejado} 
                            addHorario={addHorario} 
                            remRegister={remRegister}/>
                </>
                )) : setMostrarComponente(!mostrarComponente) }    
                <button
                    className="formButton1"
                    onSubmit={onSubmitGravarMedicmentoHandler}>
                        Gravar
                </button>
                
            </form>
            <MyButton onClick={() => navigate(-1)}>Cancelar</MyButton>
            
        </div>
    )
}

export default CadastrarMedicamento