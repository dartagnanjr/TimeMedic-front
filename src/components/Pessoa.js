import React, { useState, useEffect } from "react";
import "./styles/Pessoa.css"
import { useLocation, useNavigate } from "react-router-dom";
import ListaMedicamentos from "./ListaMedicamentos";
import myImage from "../images/dartagnan.jpg"
import imAnalia from "../images/analia.jpeg"
import Biometria from "./Biometria"
import MyButton from "../hooks/MyButton";
import useBiometria from "../hooks/useBiometria";
import usePessoa from "../hooks/usePessoa";
import useMedicamento from "../hooks/useMedicamento";

function Pessoa(props) {

    const location = useLocation();
    const { id } = location.state || {}; // Recupera o id do estado passado na navegação
    const navigate = useNavigate(); // Hook para navegação
    const { medicamentos, getMedicamentos } = useMedicamento([])
    const [ image, setImage ] = useState([])
    const { pessoa, getPessoa, setPessoaData } = usePessoa([]);
    const { biometria, getBiometrias, onInsertBiometria } = useBiometria(id)

    useEffect(() => {
        const retorno = getPessoa(id)
        setPessoaData(retorno)
    }, [ id ]);

    useEffect(() => {
        if (pessoa.nome === ('FRANCISCO DARTAGNAN')) {
            setImage(myImage)
        } else {
            setImage(imAnalia)
        }
    }, [ pessoa ])

    useEffect(() => {
        getBiometrias()
        
    }, [])

    useEffect(() => {
        getMedicamentos(id);
    }, [ id ])

    const onSubmitMedicamentos = (event) => {
        //event.preventDefault()
        const medic = 
            {
                id: '',
                nome: '',
                dosagem: '',
                prescricao: '',
                laboratorio: '',
                quantidade_estoque: '',
                pessoa_id: id,
                medicamentos_horarios: []
            }
        
        navigate('/cadastrar-medicamentos', { state: { medic: medic } })
    }
    const onSubmitListarMedicamentos = (event) => {
        navigate('/listar-medicamentos', { state: { id: id, medicamentos: medicamentos }, })
    }

    return (
        <div>
            <section className="perfil">
                <img
                    src={image}
                    alt="Button Icon"
                    style={{ width: "160px", height: "190px", marginRight: "5px", marginLeft: "5px" }}
                >
                </img>
                
                <div className="title">
                    <b>{pessoa.nome} {pessoa.sobre_nome} </b>

                    <b>{pessoa.email}</b>

                    <b>Nascimento: {new Date(pessoa.data_nascimento).toLocaleString('pt-BR', {
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
                        <td align="center"><b>Laboratório</b></td>
                        <td align="right"><b>Dosagem</b></td>
                        <td align="right"><b>Estoque</b></td>
                        <td align="center"><b>Horario</b></td>
                        <td align="center"><b>Últ. Horário</b></td>
                    </tr>
                    {medicamentos ? medicamentos.map(_medic => (
                        <ListaMedicamentos
                            pessoa_id={_medic.pessoa_id}
                            nome={_medic.nome}
                            dosagem={_medic.dosagem}
                            laboratorio={_medic.laboratorio}
                            qtde={_medic.quantidade_estoque}
                            hr_marcada={_medic.medicamentos_horarios?.sort((a, b) => a.horario_planejado).map(_hp =>
                                _hp.horario_planejado?.slice(0, 5).concat(' - ')).toString().slice(0, -2).replace(',', '')}
                            ult_horario={_medic.medicamentos_horarios?.map(_mh => _mh?.horarios_medicamentos?.map(_hm =>
                                new Date(_hm?.updated_at).toLocaleTimeString().slice(0, -3).concat(' - '))).toString().slice(0, -2).replace(/,/g, '')}
                        />
                    )) : <tr><td colSpan="6">Nenhum medicamento cadastrado.</td></tr>}
                </table>
                <table>
                    <tr>
                        <td><b>Metrica</b></td>
                        <td align="center"><b>Último</b></td>
                        <td align="center"><b>Media</b></td>
                        <td align="center"><b>Menor Valor</b></td>
                        <td align="center"><b>Maior Valor</b></td>
                        <td align="center"><b>Qtde</b> </td>

                    </tr>
                    {biometria ? biometria.map(_bio => (
                        <tr>
                            <td>{_bio.nome}:</td>
                            <td align="center">{parseFloat(_bio.ultimo)}</td>
                            <td align="center">{parseFloat(_bio.media).toPrecision(4)}</td>
                            <td align="center">{_bio.menor_valor}</td>
                            <td align="center">{_bio.maior_valor}</td>
                            <td align="center">{_bio.quantidade}</td>
                        </tr>
                    )) : <tr><td colSpan="6">Nenhum dado biométrico cadastrado.</td></tr>}
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