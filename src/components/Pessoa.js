import React from "react";
import "./Pessoa.css"
import { useNavigate } from "react-router-dom";
 

function Pessoa (props) {
    const navigate = useNavigate(); // Hook para navegação

    const onSubmitMedicamentos = () => {
        navigate('/cadastrar-medicamentos', { state: { id: props.id }})
    }
    const onSubmitListaMedicamentos = () => {
        navigate('/listar-medicamentos', { state: { id: props.id }})
    }
    return (
        <div className="Pessoa">
            <h4>{props.nome} {props.sobre_nome} <p>{props.email}</p></h4>
            <button className="btReg" type="submit" onClick={onSubmitMedicamentos}> Cadastrar Medicamento </button>
            <button className="LstMedics" type="submit" onClick={onSubmitListaMedicamentos}>Listar Medicamentos</button>
        </div>
    )
    
};

export default Pessoa;