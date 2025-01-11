import React, { useState, useEffect } from "react";
import "./Pessoa.css"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ListaMedicamentos from "./ListaMedicamentos";
import myImage from "../images/dartagnan.jpg"
import imAnalia from "../images/analia.jpeg"
import Biometria from "./Biometria"

function Pessoa (props) {

    const location = useLocation();
    const { id } = location.state || {}; // Recupera o id do estado passado na navegação
    const navigate = useNavigate(); // Hook para navegação
    const [ medicamentos, setMedicamentos ] = useState([])
    const [ image, setImage ] = useState([])
    const [ pessoas, setPessoas] = useState([]);

    useEffect(() => {
        const url = `http://192.168.0.152:3001/pessoas/${id}`
        fetch(url, { 
            method: "GET",
            })
            .then((response) => {
                if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
                }
                return response.json();
            })
            .then((dados) => {
                if (dados) {
                    const result = {
                        id: dados.id,
                        nome: dados.nome,
                        sobre_nome: dados.sobre_nome,
                        data_nascimento: dados.data_nascimento,
                        email: dados.email
                    } 
                    setPessoas(result);
                } else {
                    throw new Error('Nenhum registro encontrado.')
                }
            })
            .catch((error) => console.error("Erro ao buscar pessoas:", error));
        
      }, []); 

    useEffect(() => {
        if (pessoas.nome === ('Francisco Dartagnan')){
          setImage(myImage)
        } else {
          setImage(imAnalia)
        }
    }, [pessoas])

    const onSubmitMedicamentos = (event) => {
        event.preventDefault()
        navigate('/cadastrar-medicamentos', { state: { id: id }})
    }
    const onSubmitListarMedicamentos = (event) => {
        event.preventDefault()
        navigate('/listar-medicamentos', { state: { id: id }})
    }

    const onSubmitListaCompras = (event) => {
        event.preventDefault()

        if (!medicamentos.length) {
            fetch(`http://192.168.0.152:3001/medicamentos/pessoa/${id}`, {
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
        } else {
            setMedicamentos([])
        }
        
    }

    return (
        <div className="Pessoa">
            <img 
                src={image}
                alt="Button Icon"
                style={{ width: "60px", height: "60px", marginRight: "5px", marginLeft: "5px"}}
                        >
            </img>
            <h4>{pessoas.nome} {pessoas.sobre_nome} <p>{pessoas.email}</p></h4>
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
            <div>
                <Biometria pessoa_id={props.id} />
            </div>
            
        </div>
        
    )
    
};

export default Pessoa;