import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './styles/CadastrarMedicamento.css'
import useMedicamento from "../hooks/useMedicamento";
import MyButton from "../hooks/MyButton";

function CadastrarMedicamento (props) {
    const navigate = useNavigate();
    const location = useLocation();
    let { medic } = location.state || {};
    const [ horario, setHorario ] = useState([])
    const horarioInputRef = useRef(null);
    
    const { medicamento, setMedicamento, setUpdateMedicamento, createMedicamento, createHorarioMedicamento, updateHorarioMedicamento, destroyMedicamento } = useMedicamento({
        id: medic?.id || '',
        nome: medic?.nome || '',
        dosagem: medic?.dosagem || '',
        prescricao: medic?.prescricao || '',
        laboratorio: medic?.laboratorio || '',
        quantidade_estoque: medic?.quantidade_estoque || 0,
        pessoa_id: medic.pessoa_id || '',
        medicamentos_horarios: medic?.medicamentos_horarios?.flatMap(h => [{ id: h.id, horario_planejado: h.horario_planejado }] ) || []
    })
    
    const onSubmitGravarMedicmentoHandler = async (event) => {
        
        if (medicamento.id) {
            const ret = await setUpdateMedicamento(medicamento, medicamento.id)
            if (!ret) {
                alert('Problemas ao atualizar medicamento.')
                return
            }
            destroyMedicamento(medicamento.id)
            // const response = horario.map(async _hor => {
                
            //     return await updateHorarioMedicamento({ horario_planejado: _hor.horario_planejado }, _hor.id)
            // })
            const response = horario.map(async _x => {
                const result = {
                    medicamento_id: medicamento.id,
                    horario_planejado: _x,
                    status: 0
                }
                const ret = await createHorarioMedicamento(result)
                if (!ret){ 
                    alert(`Problemas ao criar horário: ${_x}`)
                    return
                }
            })
            
            if (!response) {
                alert('Problemas ao atualizar horário do medicamento.')
                return
            }
            //const horario = await updateHorarioMedicamento()
            alert(String().concat('Medicamento ', medicamento.name, ' atualizado com sucesso.'))
            navigate(-1)
        } else {
            if (horario?.length === 0) {
                alert('Adicione pelo menos um horário para o medicamento.')
                return
            }
            medic = { ...medicamento }
            delete medic.id // Limpa o id para criar um novo medicamento
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
    
    const onSubmitChanges = (key, newValue) => {

        try {
            const updatedMedicament = { ...medicamento, [key]: newValue } ;
            setMedicamento(updatedMedicament);
            console.log('Medicamento atualizado:', medicamento);
        } catch (error) {
            throw new Error(error)
        }
       
    }

    return (
        <div className="form_input">
            
            <form  >
                <h2>Cadastrar Medicamento</h2>
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
                
                <label>Horários: </label>
                <input
                    type="time"
                    name="horario_planejado"
                    ref={horarioInputRef} // Adicione uma ref para o input
                />
                
                <textarea 
                    name="horario_planejado_lista"
                    placeholder="Horários adicionados aparecerão aqui"
                    value={horario.join(', ') || medicamento.medicamentos_horarios.map(h => h.horario_planejado).join(', ')}
                    readOnly
                    required
                />
            </form>
            <div style={{ display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            alignContent: 'center', 
                            flexDirection: 'column', 
                            marginTop: '10px', 
                            gap: '10px' 
                        }}>
                <MyButton
                    type="button"
                    onClick={() => {
                        const value = horarioInputRef.current.value;
                        if (value) {
                            setHorario([...horario, value]);
                            horarioInputRef.current.value = ''; // Limpa o campo após adicionar
                        } else {
                            alert('Por favor, selecione um horário válido.');
                        }
                    }}
                >
                    Adicionar Horário
                </MyButton>
                <MyButton
                    type="button"
                    onClick={(event) => (onSubmitGravarMedicmentoHandler(event))}
                    className="formButton1">
                        Gravar
                </MyButton>
                <MyButton type="button" onClick={() => navigate(-1)}>Cancelar</MyButton> 
            </div>
            
        </div>
    )
}

export default CadastrarMedicamento