import React, { useState, useEffect } from "react";
import "./Pessoa.css"
import { useNavigate } from "react-router-dom";
import ListaMedicamentos from "./ListaMedicamentos";
import myImage from "../images/dartagnan.jpg"
import imAnalia from "../images/analia.jpeg"

function Pessoa (props) {

    const navigate = useNavigate(); // Hook para navegação
    const [ medicamentos, setMedicamentos ] = useState([])
    const [ image, setImage ] = useState([])

    useEffect(() => {
        if (props.nome === ('Francisco Dartagnan')){
          setImage(myImage)
        } else {
          setImage(imAnalia)
        }
    }, [props])

    const onSubmitMedicamentos = () => {
        navigate('/cadastrar-medicamentos', { state: { id: props.id }})
    }
    const onSubmitListarMedicamentos = () => {
        navigate('/listar-medicamentos', { state: { id: props.id }})
    }

    const onSubmitListaCompras = () => {
        fetch(`http://192.168.0.152:3001/medicamentos/pessoa/${props.id}`, {
            method: 'GET'
        }).then(_response => _response.json()
        ).then(dados => {
            if (dados.length){
                const response = dados.map(_medic => {
                    return {
                        nome: _medic.nome,
                        dosagem: _medic.dosagem,
                        laboratorio: _medic.laboratorio
                    }
                })
                setMedicamentos(response)
                return
            } else {
                alert('Nenhum medicamento encontrado')
            }
        }).catch(err => {throw new Error(err)})
    }

    return (
        <div className="Pessoa">
            <img 
                src={image}
                alt="Button Icon"
                style={{ width: "60px", height: "60px", marginRight: "5px", marginLeft: "5px"}}
                        >
            </img>
            <h4>{props.nome} {props.sobre_nome} <p>{props.email}</p></h4>
            <button className="btReg" type="submit" onClick={onSubmitMedicamentos}> Cadastrar Medicamento </button>
            <button className="LstMedics" type="submit" onClick={onSubmitListarMedicamentos}>Listar Medicamentos</button>
            <button className="LstCompras" type="submit" onClick={onSubmitListaCompras}>Lista de Compras</button>
            <div className="list">
                {medicamentos.map(_medic => (
                    <ListaMedicamentos
                        nome={_medic.nome}
                        dosagem={_medic.dosagem}
                        laboratorio={_medic.laboratorio}    
                    />
                ))}
            </div>
            
        </div>
    )
    
};

export default Pessoa;