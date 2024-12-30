import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './CadastrarMedicamento.css'

function CadastrarMedicamento (props) {
    const [ nome, setNome ] = useState('')
    const [ dosagem, setDosagem ] = useState('')
    const [ prescricao, setPrescricao ] = useState('')
    const [ laboratorio, setLaboratorio ] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};


    const onSubmitGravarMedicmentoHandler = (event) => {
        event.preventDefault();

        const medicamento = { nome, dosagem, prescricao, laboratorio, pessoa_id: id }
    
        fetch('http://localhost:3001/medicamentos', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(medicamento)
        })
        .then((result) => {
            if (!result.ok){
                alert('Error ao cadastrar medicamentos. ', result.status)
            }
            return result.json()
        } 
        )
        .then((dados) => {
            if (dados === 'Validation error'){
                alert(`Error: Medicamento ${medicamento.nome} já cadastrado.`)
                return
            }
            setNome('')
            setDosagem('')
            setPrescricao('')
            setLaboratorio('')
            if (dados){
                navigate('/gravar-horario', { state: { id: dados.id, nome: medicamento.nome } })
                alert(`Medicamento ${medicamento.nome} gravado com sucesso.`)
            } else {
                throw new Error('Problemas ao cadastrar remédio, tente novamente.')
            }
        })
    }

    return (
        <div className="CadastrarMedicamento">
            <h4>Cadastrar Medicamento</h4>
            <form onSubmit={onSubmitGravarMedicmentoHandler}>
                <label>Nome: <input type="text" name="nome" placeholder="Digite o nome do remédio" value={nome} onChange={(event) => setNome(event.target.value)} required /> </label>
                <label>Dosagem:
                    <input
                            type="text"
                            name="dosagem"
                            placeholder="Digite a dosagem do remédio"
                            value={dosagem}
                            onChange={(event) => setDosagem(event.target.value)}
                            required
                             />
                </label>
                <label>Prescrição: 
                    <input
                            type="text"
                            name="prescricao"
                            placeholder="Digite a prescicao do remédio"
                            value={prescricao}
                            onChange={(event) => setPrescricao(event.target.value)}
                             />
                </label>
                <label>Laboratório:
                    <input
                            type="text"
                            name="laboratorio"
                            placeholder="Digite o laboratorio do remédio"
                            value={laboratorio}
                            onChange={(event) => setLaboratorio(event.target.value)}
                             />
                </label>
                <div>
                    <button type="submit">Gravar</button>
                </div>
            </form>
        </div>
    )
}

export default CadastrarMedicamento