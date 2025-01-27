import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './CadastrarMedicamento.css'
import useMedicamento from "../hooks/useMedicamento";
import MyButton from "../hooks/MyButton";

function CadastrarMedicamento (props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { medicamento } = location.state || {};
    const [ ishidden, setIsHidden ] = useState(true)
    const [ horario, setHorario ] = useState('')
    const [ novo_id, setNovoId ] = useState('')
    const [ medicament, setMedicamento ] = useMedicamento(medicamento)

    

    const onSubmitGravarMedicmentoHandler = (event) => {
        event.preventDefault();

        const medic = { 
                nome: medicament[0].nome, 
                dosagem: medicament[0].dosagem, 
                prescricao: medicament[0].prescricao, 
                laboratorio: medicament[0].laboratorio, 
                quantidade_estoque: medicament[0].quantidade_estoque, 
                pessoa_id: medicament[0].pessoa_id }
    
        fetch('http://192.168.0.152:3001/medicamentos', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(medic)
        }).then((result) => {
            if (!result.ok){
                alert('Error ao cadastrar medicamentos. ', result.status)
                return
            } else {
                return result.json()
            }
        }).then((dados) => {
            if (!dados){
                alert(`Error: Medicamento ${medicament[0].nome} já cadastrado.`)
                return
            }
            if (dados){
                alert(`Medicamento ${medicament[0].nome} gravado com sucesso.`)
                //navigate('/gravar-horario', { state: { id: dados.id, nome: medicamento.nome } })
                navigate(-1); // Retorna ao componente pai
            } else {
                throw new Error('Problemas ao cadastrar remédio, tente novamente.')
            }
        })
        
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
                    alert(`Horário ${horario} gravado com sucesso para o medicamento ${medicament[0].nome}`)

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
    const onSubmitChanges = (key, index, newValue) => {

        const atualizaMedic = (() => {
            const updatedKeyData = { ...medicament[0][key] };
            updatedKeyData[key] = newValue;
            return [ { ...medicament[0], [key]: newValue } ];
          });
          const result = atualizaMedic()
          setMedicamento(result)
          
    }

    return (
        <div className="CadastrarMedicamento">
            <h4>Cadastrar Medicamento</h4>
            <form onSubmit={onSubmitGravarMedicmentoHandler}>
                <div >
                    <label>Nome: </label>
                    <input 
                        type="text" 
                        name="nome" 
                        placeholder="Digite o nome do remédio" 
                        value={medicament[0].nome} 
                        onChange={(event) => onSubmitChanges('nome', 0, event.target.value)} 
                        required />
                </div>
                <div >
                    <label>Dosagem:  </label>
                    <input 
                        type="text" 
                        name="dosagem" 
                        placeholder="Digite a dosagem do remédio" 
                        value={medicament[0].dosagem} 
                        onChange={(event) => onSubmitChanges('dosagem', 0, event.target.value)} 
                        required />
                </div>
                <div >
                    <label>Prescrição:  </label>
                    <input 
                        type="text" 
                        name="prescricao" 
                        placeholder="Digite a prescicao do remédio" 
                        value={medicament[0].prescricao} 
                        onChange={(event) => onSubmitChanges('prescricao', 0, event.target.value)} />
                </div>
                <div >
                    <label>Laboratório:  </label>
                    <input 
                        type="text" 
                        name="laboratorio" 
                        placeholder="Digite o laboratorio do remédio" 
                        value={medicament[0].laboratorio} 
                        onChange={(event) => onSubmitChanges('laboratorio', 0, event.target.value)} />
                </div>
                <div >
                    <label>Estoque:  </label>
                    <input 
                        type="text" 
                        name="quantidade" 
                        placeholder="Digite a quantidade do remédio em estoque" 
                        value={medicament[0].quantidade_estoque} 
                        onChange={(event) => onSubmitChanges('quantidade_estoque', 0, event.target.value)} />
                </div>
                <div>
                <button 
                    className="formButton" 
                    type="submit"
                    onSubmit={onSubmitGravarMedicmentoHandler}
                    >
                        Gravar
                </button>
            </div>
            </form>
            <div>
                <MyButton className="formButton" onClick={() => navigate(-1)}>Cancelar</MyButton>
            </div>
            <div className="GravarHorario" hidden={ishidden}>
                <form  
                    onSubmit={onSubmitGravarHorarioHandler}>
                    <h5>
                        Medicamento: {medicament[0].nome}
                    </h5>
                    <label>Horário</label>
                        <input
                            type="text"
                            name="horario"
                            placeholder="Digite o horário do medicamento"
                            value={horario}
                            onChange={(event) => setHorario(event.target.value)}
                            required
                        />
                    <button type="submit">Gravar</button>
                </form>
            </div>
        </div>
    )
}

export default CadastrarMedicamento