import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './CadastrarMedicamento.css'
import GravarHorario from "./GravarHorario"

function CadastrarMedicamento (props) {
    const [ nome, setNome ] = useState('')
    const [ dosagem, setDosagem ] = useState('')
    const [ prescricao, setPrescricao ] = useState('')
    const [ laboratorio, setLaboratorio ] = useState('')
    const [ quantidade, setQuantidade ] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    const [ teste, setTeste ] = useState(false)


    const onSubmitGravarMedicmentoHandler = (event) => {
        event.preventDefault();

        const medicamento = { nome, dosagem, prescricao, laboratorio, quantidade_estoque: quantidade, pessoa_id: id }
    
        fetch('http://192.168.0.152:3001/medicamentos', {
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
            if (dados === 'Validation error' || dados.created_at.length === 0 ){
                alert(`Error: Medicamento ${medicamento.nome} já cadastrado.`)
                return
            }
            setNome('') 
            setDosagem('')
            setPrescricao('')
            setLaboratorio('')
            setQuantidade('')
            if (dados){
                //setTeste(true)
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
                <div >
                    <label>Nome: <input className="nome" type="text" name="nome" placeholder="Digite o nome do remédio" value={nome} onChange={(event) => setNome(event.target.value)} required /> </label>
                </div>
                <div >
                    <label>Dosagem: <input className="dosagem" type="text" name="dosagem" placeholder="Digite a dosagem do remédio" value={dosagem} onChange={(event) => setDosagem(event.target.value)} required /> </label>
                </div>
                <div >
                    <label>Prescrição: <input className="prescricao" type="text" name="prescricao" placeholder="Digite a prescicao do remédio" value={prescricao} onChange={(event) => setPrescricao(event.target.value)} /> </label>
                </div>
                <div >
                    <label>Laboratório: <input className="laboratorio" type="text" name="laboratorio" placeholder="Digite o laboratorio do remédio" value={laboratorio} onChange={(event) => setLaboratorio(event.target.value)} /> </label>
                </div>
                <div >
                    <label>Qtde. Estoque: <input className="quantidade" type="text" name="quantidade" placeholder="Digite a quantidade do remédio em estoque" value={quantidade} onChange={(event) => setQuantidade(event.target.value)} /> </label>
                </div>
                <div>
                    <button type="submit">Gravar</button>
                </div>
            </form>
            <div>
                {() => {
                    if (teste) {
                        <h4>Testando...</h4>
                    }
                    }
                }
            </div>
           
        </div>
    )
}

export default CadastrarMedicamento