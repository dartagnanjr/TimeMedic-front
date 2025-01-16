import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './CadastrarMedicamento.css'

function CadastrarMedicamento (props) {
    const [ nome, setNome ] = useState('')
    const [ dosagem, setDosagem ] = useState('')
    const [ prescricao, setPrescricao ] = useState('')
    const [ laboratorio, setLaboratorio ] = useState('')
    const [ quantidade, setQuantidade ] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    const [ ishidden, setIsHidden ] = useState(true)
    const [ horario, setHorario ] = useState('')
    const [ novo_id, setNovoId ] = useState('')


    const onSubmitGravarMedicmentoHandler = (event) => {
        event.preventDefault();

        const medicamento = { nome, dosagem, prescricao, laboratorio, quantidade_estoque: quantidade, pessoa_id: id }
    
        fetch('http://192.168.0.152:3001/medicamentos', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(medicamento)
        }).then((result) => {
            if (!result.ok){
                alert('Error ao cadastrar medicamentos. ', result.status)
                return
            } else {
                return result.json()
            }
        }).then((dados) => {
            if (!dados){
                alert(`Error: Medicamento ${medicamento.nome} já cadastrado.`)
                return
            }
            if (dados){
                //setNome('') 
                setDosagem('')
                setPrescricao('')
                setLaboratorio('')
                setQuantidade('')
                setIsHidden(false)
                setNovoId(dados.id)
                alert(`Medicamento ${medicamento.nome} gravado com sucesso.`)
                //navigate('/gravar-horario', { state: { id: dados.id, nome: medicamento.nome } })
                
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
                    alert(`Horário ${horario} gravado com sucesso para o medicamento ${nome}`)

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

    return (
        <div className="CadastrarMedicamento">
            <h4>Cadastrar Medicamento</h4>
            <form onSubmit={onSubmitGravarMedicmentoHandler}>
                <div >
                    <label>Nome: </label>
                    <input type="text" name="nome" placeholder="Digite o nome do remédio" value={nome} onChange={(event) => setNome(event.target.value)} required />
                </div>
                <div >
                    <label>Dosagem:  </label>
                    <input type="text" name="dosagem" placeholder="Digite a dosagem do remédio" value={dosagem} onChange={(event) => setDosagem(event.target.value)} required />
                </div>
                <div >
                    <label>Prescrição:  </label>
                    <input type="text" name="prescricao" placeholder="Digite a prescicao do remédio" value={prescricao} onChange={(event) => setPrescricao(event.target.value)} />
                </div>
                <div >
                    <label>Laboratório:  </label>
                    <input type="text" name="laboratorio" placeholder="Digite o laboratorio do remédio" value={laboratorio} onChange={(event) => setLaboratorio(event.target.value)} />
                </div>
                <div >
                    <label>Estoque:  </label>
                    <input type="text" name="quantidade" placeholder="Digite a quantidade do remédio em estoque" value={quantidade} onChange={(event) => setQuantidade(event.target.value)} />
                </div>
            </form>
            <div>
                <button className="formButton" type="submit">Gravar</button>
            </div>
            <div className="GravarHorario" hidden={ishidden}>
                <form  onSubmit={onSubmitGravarHorarioHandler}>
                    <h5>
                        Medicamento: {nome}
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