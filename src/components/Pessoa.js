import React, { useState, useEffect } from "react";
import "./Pessoa.css"
import { useLocation, useNavigate } from "react-router-dom";
import ListaMedicamentos from "./ListaMedicamentos";
import myImage from "../images/dartagnan.jpg"
import imAnalia from "../images/analia.jpeg"
import Biometria from "./Biometria"
import MyButton from "../hooks/MyButton";

function Pessoa (props) {

    const location = useLocation();
    const { id } = location.state || {}; // Recupera o id do estado passado na navegação
    const navigate = useNavigate(); // Hook para navegação
    const [ medicamentos, setMedicamentos ] = useState([])
    const [ image, setImage ] = useState([])
    const [ pessoas, setPessoas] = useState([]);
    const [ biometria, setBiometria ] = useState([])
    const [ lista, setLista ] = useState([])

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

    useEffect(() => {
        fetch(`http://192.168.0.152:3001/biometria/pessoa/${id}`, {
            method: 'GET'
        }).then((response) => {
            if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
            }
            return response.json();
        }).then(dados => {
            if (!dados){
                alert('Nenhum registro encontrado.')
                return
            } 
            const result = dados
            setBiometria(result)
        })
    }, [])

    useEffect(() => {
        if (!medicamentos.length) {
            fetch(`http://192.168.0.152:3001/medicamentos/pessoa/${id}`, {
            method: 'GET'
            }).then(_response => _response.json()
            ).then(dados => {
                if (dados.length){
                    // const response = dados.map(_medic => {
                    //     return {
                    //         nome: _medic.nome,
                    //         dosagem: _medic.dosagem,
                    //         laboratorio: _medic.laboratorio
                    //     }
                    // })
                    setMedicamentos(dados)
                    return
                } else {
                    alert('Nenhum medicamento encontrado')
                }
            }).catch(err => {throw new Error(err)})
        } else {
            setMedicamentos([])
        }
    }, [])

    const onSubmitMedicamentos = (event) => {
        //event.preventDefault()
        navigate('/cadastrar-medicamentos', { state: { id: id }})
    }
    const onSubmitListarMedicamentos = (event) => {
        //event.preventDefault()
        navigate('/listar-medicamentos', { state: { id: id, medicamentos: medicamentos },  })
    }


    return (
        <div>
            <section className="perfil">
                <img 
                    src={image}
                    alt="Button Icon"
                    style={{ width: "160px", height: "160px", marginRight: "5px", marginLeft: "5px"}}
                            >
                </img>
                <div>
                    <h4>{pessoas.nome} {pessoas.sobre_nome} </h4>
                    <h5>{pessoas.email}</h5>
                </div>
            </section>
            <div className="cadbiometria">
                <Biometria pessoa_id={id} />
            </div>
            <div className="listBiometria">
                <table>
                    {biometria.map(_bio => (
                        <tr>
                            <td>{_bio.metrica_nome}:</td>
                            <td align="right">{_bio.media}</td>
                        </tr>
                ))}
                </table>
            </div>
            <div className="list">
                <table>
                    {medicamentos.map(_medic => (
                       <ListaMedicamentos
                       nome={_medic.nome}
                       dosagem={_medic.dosagem}
                       laboratorio={_medic.laboratorio}    
                   /> 
                    ))}
                </table>
            </div>
            <section className="but">
                <div >
                    <MyButton className="buttons" onClick={onSubmitMedicamentos}>Cadastrar</MyButton>
                    <MyButton className="buttons" onClick={onSubmitListarMedicamentos}>Registrar</MyButton>
                    {/* <MyButton className="buttons" onClick={onSubmitListaCompras}>Listar</MyButton> */}
                </div>
            </section>
        </div>
        
    )
    
};

export default Pessoa;