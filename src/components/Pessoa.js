import React, { useState, useEffect } from "react";
import "./styles/Pessoa.css"
import { useLocation, useNavigate } from "react-router-dom";
import ListaMedicamentos from "./ListaMedicamentos";
import myImage from "../images/dartagnan.jpg"
import imAnalia from "../images/analia.jpeg"
import Biometria from "./Biometria"
import MyButton from "../hooks/MyButton";
import useBiometria from "../hooks/useBiometria";

function Pessoa (props) {

    const location = useLocation();
    const { id } = location.state || {}; // Recupera o id do estado passado na navegação
    const navigate = useNavigate(); // Hook para navegação
    const [ medicamentos, setMedicamentos ] = useState([])
    const [ image, setImage ] = useState([])
    const [ pessoas, setPessoas] = useState([]);
    const { biometria, getBiometrias, setBiometria, onInsertBiometria } = useBiometria(id)


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
        getBiometrias()
    }, [])

    useEffect(() => {
        if (!medicamentos.length) {
            fetch(`http://192.168.0.152:3001/medicamentos/pessoa/${id}`, {
            method: 'GET'
            }).then(_response => _response.json()
            ).then(dados => {
                if (dados.length){
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
        const medic = { 
            id: '',
            nome: '', 
            dosagem: '', 
            prescricao: '', 
            laboratorio: '', 
            quantidade_estoque: '', 
            pessoa_id: id,
            medicamentos_horarios: []
         }
        navigate('/cadastrar-medicamentos', { state: { medic: [ medic ] }})
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
                    style={{ width: "160px", height: "190px", marginRight: "5px", marginLeft: "5px"}}
                            >
                </img>
                <div className="title">
                    <b>{pessoas.nome} {pessoas.sobre_nome} </b>
                    <br />
                    <b>{pessoas.email}</b>
                    <br />
                    <b>Nascimento: {new Date(pessoas.data_nascimento).toLocaleString('pt-BR', {
                                                                            day: '2-digit',
                                                                            month: '2-digit',
                                                                            year: 'numeric'
                                                                            }).replace(/\//g, '-')}</b>
                </div>
                <Biometria pessoa_id={id} onInsertBiometria={onInsertBiometria} />
            </section>
            
            <div className="listBiometria">
                <table>
                    <tr>
                        <td><b>Medicamento</b></td>
                        <td align="right"><b>Dosagem</b></td>
                        <td align="right"><b>Estoque</b></td>
                    </tr>
                    {medicamentos.map(_medic => (
                       <ListaMedicamentos
                       pessoa_id={_medic.pessoa_id}
                       nome={_medic.nome}
                       dosagem={_medic.dosagem}
                       laboratorio={_medic.laboratorio} 
                       qtde={_medic.quantidade_estoque}   
                   /> 
                    ))}
                </table>
                <table>
                    <tr>
                        <td><b>Metrica</b></td>
                        <td align="right"><b>Último</b></td>
                        <td align="right"><b>Media</b></td>
                        <td align="right"><b>Menor Valor</b></td>
                        <td align="right"><b>Maior Valor</b></td>
                        
                    </tr>
                    {biometria.map(_bio => (
                        <tr>
                            <td>{_bio.nome}:</td>
                            <td align="right">{parseFloat(_bio.ultimo)}</td>
                            <td align="right">{parseFloat(_bio.media).toPrecision(4)}</td>
                            <td align="right">{_bio.menor_valor}</td>
                            <td align="right">{_bio.maior_valor}</td>
                        </tr>
                ))}
                </table>
            </div>
            <div className="but" >
                <MyButton className="bt_pessoa" onClick={onSubmitMedicamentos}>Cadastrar</MyButton>
                <MyButton className="bt_pessoa" onClick={onSubmitListarMedicamentos}>Registrar</MyButton>
                <MyButton className="bt_pessoa" onClick={() => navigate(-1)} >Logout</MyButton>
            </div> 
        </div>
         
    )
    
};

export default Pessoa;