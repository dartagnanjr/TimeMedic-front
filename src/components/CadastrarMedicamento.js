import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './styles/CadastrarMedicamento.css'
import useMedicamento from "../hooks/useMedicamento";
import MyButton from "../hooks/MyButton";
import Horario from "./Horario";


function CadastrarMedicamento (props) {
    const navigate = useNavigate();
    const location = useLocation();
    let { medic } = location.state || {};
    const [ horario, setHorario ] = useState([])
    const [ novo_id, setNovoId ] = useState([])
    
    const { medicamento, setMedicamento, setUpdateMedicamento, createMedicamento, createHorarioMedicamento, updateHorarioMedicamento } = useMedicamento({
        id: medic[0]?.id || 0,
        nome: medic[0]?.nome || '',
        dosagem: medic[0]?.dosagem || '',
        prescricao: medic[0]?.prescricao || '',
        laboratorio: medic[0]?.laboratorio || '',
        quantidade_estoque: medic[0]?.quantidade_estoque || 0,
        pessoa_id: medic[0]?.pessoa_id || 0,
        medicamentos_horarios: medic[0]?.medicamentos_horarios || []
    })
    const [mostrarComponente, setMostrarComponente] = useState(false);
    
    const onSubmitGravarMedicmentoHandler = async (event) => {
        event.preventDefault();
        const id = medicamento.id
        
        if (medicamento.id) {
            const ret = await setUpdateMedicamento(medicamento, id)
            if (!ret) {
                alert('Problemas ao atualizar medicamento.')
                return
            }
            const response = medicamento.medicamentos_horarios.map(async _hor => {
                console.log(_hor, _hor.id)
                return await updateHorarioMedicamento({ horario_planejado: _hor.horario_planejado }, _hor.id)
            })
            console.log(response)
            if (!response) {
                alert('Problemas ao atualizar horário do medicamento.')
                return
            }
            //const horario = await updateHorarioMedicamento()
            alert(String().concat('Medicamento ', medicamento.name, ' atualizado com sucesso.'))
            navigate(-1)
        } else {
            if (medicamento.medicamentos_horarios?.length === 0) {
                alert('Adicione pelo menos um horário para o medicamento.')
                return
            }
            const nv_medicamentoId = await createMedicamento(medic)
            if (!nv_medicamentoId) {
                alert('Problemas criando novo medicamento.')
                return
            }
            horario.map(async _x => {
                const result = {
                    medicamento_id: nv_medicamentoId,
                    horario_planejado: _x,
                    status: 0
                }
                const ret = await createHorarioMedicamento(result)
                if (!ret){ 
                    alert(`Problemas ao criar horário: ${_x}`)
                    return
                }
            })
            alert('Cadastro de horários realizado com sucesso.')
            
            alert(`Medicamento ${medicamento.nome} cadastrado com sucesso.`)
            navigate(-1)
        }
        return
        
    }
    // const onSubmitGravarHorarioHandler = (event) => {
    //     event.preventDefault();
    //     if (window.confirm`Confirma a inclusão do horário ${horario} ?`) {

    //         const horarios = { medicamento_id: novo_id, horario_planejado: horario, status: 0 }

    //         fetch('http://192.168.0.152:3001/horarios', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(horarios),
    //         })
    //             .then((result) => {
    //                 if (!result.ok){
    //                     alert(`Não foi possivel gravar o novo horário: ${result.error} `)
    //                     throw new Error(result.error)
    //                 }
    //                 return result.json()
    //             })
    //             .then((dados) => {
    //             if (dados) {
    //                 alert(`Horário ${horario} gravado com sucesso para o medicamento ${medicamento.nome}`)
    //                 if (window.confirm`Deseja incluir outro horário ?`) {
    //                     setHorario('00:00:00')
    //                 }   else {
    //                     setHorario('')
    //                 }
    //             } else {
    //                 alert("Problemas ao gravar horário do medicamento.");
    //             }
    //             })
    //             .catch((error) => console.error("Erro na autenticação:", error));
    //     }
    // }
    const onSubmitChanges = (key, newValue) => {

        try {
            const updatedMedicament = [ { ...medicamento, [key]: newValue } ];
            setMedicamento(updatedMedicament);
        } catch (error) {
            throw new Error(error)
        }
       
    }

    const remRegister = (id) => {
        //const { id } = target.value
        setNovoId(novo_id.filter(_hor => _hor.id !== id))
        novo_id.length > 0 ? setMostrarComponente(true) : setMostrarComponente(false)
        
    }

    const addRegister = () => {
        setNovoId([ ...novo_id, novo_id.length + 1 ])
        //medicamento.medicamentos_horarios.push({ id: novo_id })
        console.log('horarios: ', horario, 'ids: ', novo_id)
    }

    const addHorario = (hora) => {
        setHorario([...horario, hora])
        setMostrarComponente(!mostrarComponente)
        //setNovoId([ ...novo_id, horario.length + 1])
        //console.log('horarios: ', horario, 'ids: ', novo_id)
    }

    return (
        <div className="form_input">
            
            <form  onSubmit={onSubmitGravarMedicmentoHandler}>
            <h4>Cadastrar Medicamento</h4>
                <label>Nome: </label>
                <input 
                    type="text" 
                    name="nome" 
                    placeholder="Digite o nome do remédio" 
                    value={medicamento.nome} 
                    onChange={(event) => onSubmitChanges('nome', event.target.value)} 
                    required />
                <label>Dosagem:  </label>
                <input 
                    type="text" 
                    name="dosagem" 
                    placeholder="Digite a dosagem do remédio" 
                    value={medicamento.dosagem} 
                    onChange={(event) => onSubmitChanges('dosagem', event.target.value)} 
                    required />
                <label>Prescrição:  </label>
                    <input 
                    type="text" 
                    name="prescricao" 
                    placeholder="Digite a prescicao do remédio" 
                    value={medicamento.prescricao} 
                    onChange={(event) => onSubmitChanges('prescricao', event.target.value)} />
                <label>Laboratório:  </label>
                <input 
                    type="text" 
                    name="laboratorio" 
                    placeholder="Digite o laboratorio do remédio" 
                    value={medicamento.laboratorio} 
                    onChange={(event) => onSubmitChanges('laboratorio', event.target.value)} />

                <label>Estoque:  </label>
                <input 
                    type="number" 
                    name="quantidade" 
                    placeholder="Digite a quantidade do remédio em estoque" 
                    value={medicamento.quantidade_estoque} 
                    onChange={(event) => onSubmitChanges('quantidade_estoque', event.target.value)} />
                <button type="button" 
                        onClick={addRegister}>+</button>

                {mostrarComponente ? novo_id?.map((_hor, i) => (
                    
                <>
                    <label>Horário: </label>
                    <Horario id={medicamento.id} 
                            key={i}
                            //name="horario_planejado"
                            horario_planejado={ horario[i] || ''} 
                            addHorario={addHorario} 
                            remRegister={() => remRegister(i)}/>
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