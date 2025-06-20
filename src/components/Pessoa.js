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
    const { biometria, loading, setLoading, getBiometrias, onInsertBiometria } = useBiometria(id)

    useEffect(() => {
        getMedicamentos(id);
        // eslint-disable-next-line 
    }, [ id ])

    useEffect(() => {
        // eslint-disable-next-line 
        const retorno = getPessoa(id)
        // eslint-disable-next-line 
        setPessoaData(retorno)
        // eslint-disable-next-line 
    }, [ id ]);
    

    useEffect(() => {
        if (pessoa.nome === ('FRANCISCO DARTAGNAN')) {
            setImage(myImage)
        } else {
            setImage(imAnalia)
        }
    }, [ pessoa ])

    useEffect(() => { 
        if (loading) {
            getBiometrias()
            setLoading(false)
        }
        // eslint-disable-next-line 
    }, [ biometria ])

    

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
        
        navigate('/listar-medicamentos', { state: { id: id, medics: medicamentos }, })
    }

    return (
        <div>
            <section className="perfil">
                <div>
                    <div className="title">
                        <img
                            src={image}
                            alt="Button Icon"
                            style={{ width: "160px", height: "190px", marginRight: "15px", marginLeft: "15px" }}
                        >
                        </img>
                        <b style={{padding: "2px"}}>{pessoa.nome} {pessoa.sobre_nome} </b>

                        <b style={{padding: "2px"}} >{pessoa.email}</b>
                    </div>
                    
                    <div className="title">
                        

                        <b>Nascimento: {new Date(pessoa.data_nascimento).toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            timeZone: 'America/Fortaleza'
                        }).replace(/\//g, '-')}</b>
                    </div>
                </div>
                <Biometria pessoa_id={id} onInsertBiometria={onInsertBiometria} />
            </section>

            <div className="listBiometria">
                <table style={{ width: "100%", marginBottom: "20px" }}>
                    <tr align="center" style={{ backgroundColor: "#f0f0f0", fontWeight: "bold", color: "#333" }}>
                        <td ><b>Metrica</b></td>
                        <td align="center"><b>Último</b></td>
                        <td align="center"><b>Media</b></td>
                        <td align="center"><b>Menor Valor</b></td>
                        <td align="center"><b>Maior Valor</b></td>
                        <td align="center"><b>Qtde</b> </td>

                    </tr>
                    {biometria ? biometria.map(_bio => (
                        <tr align="center" key={_bio.id}>
                            <td align="left">{_bio.nome}:</td>
                            <td align="right" >{parseFloat(_bio.ultimo).toPrecision(3)}</td>
                            <td align="right">{parseFloat(_bio.media).toPrecision(3)}</td>
                            <td align="right">{parseFloat(_bio.menor_valor).toPrecision(3)}</td>
                            <td align="right" >{parseFloat(_bio.maior_valor).toPrecision(3)}</td>
                            <td >{_bio.quantidade}</td>
                        </tr>
                    )) : <tr><td colSpan="6">Nenhum dado biométrico cadastrado.</td></tr>}
                </table>
                <table style={{ width: "100%", marginBottom: "20px" }}>
                    <tr align="center" style={{ backgroundColor: "#f0f0f0", fontWeight: "bold", color: "#333",  }}>
                        <td><b>Medicamento</b></td>
                        <td ><b>Laboratório</b></td>
                        <td ><b>Dosagem</b></td>
                        <td ><b>Estoque</b></td>
                        <td ><b>Horario</b></td>
                        <td ><b>Últ. Horário</b></td>
                    </tr>
                    {medicamentos ? medicamentos.map(_medic => (
                        <ListaMedicamentos
                            pessoa_id={_medic.pessoa_id}
                            nome={_medic.nome}
                            dosagem={_medic.dosagem}
                            laboratorio={_medic.laboratorio}
                            qtde={_medic.quantidade_estoque}
                            hr_marcada={_medic.medicamentos_horarios?.sort((a, b) => a.horario_planejado).map(_hp =>
                                _hp.horario_planejado?.slice(0, 5).concat(' - ')).toString().slice(0, -2).replace(',', '').slice(0, -1).replace(/,/g, '')}
                            ult_horario={_medic.medicamentos_horarios?.map(_mh => _mh?.horarios_medicamentos?.map(_hm =>
                                new Date(_hm?.updated_at).toLocaleTimeString().slice(0, -3).concat(' - '))).toString().slice(0, -3).replace(/,/g, '')}
                        />
                    )) : <tr><td colSpan="6">Nenhum medicamento cadastrado.</td></tr>}
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