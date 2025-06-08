import React, { useEffect, useState } from "react";
import './styles/Biometria.css'
import MyButton from "../hooks/MyButton";
import useBiometria from "../hooks/useBiometria";

const Biometria = (props) => {
    const [ values, setValue ] = useState('')
    const [ metrica_id, setMetricaId ] = useState('')
    const { biometria, 
        metricas, 
        getBiometrias, 
        getMetricas, 
        setBiometria, 
        onInsertBiometria 
    } = useBiometria(props.pessoa_id)

    useEffect(() => {

        getMetricas()
        getBiometrias()
    }, [])

    useEffect(() => {
        if (biometria) {
            setValue('')
            setMetricaId('')
        }
    }, [biometria])

    const handleInsertBiometria = async (biometria) => {
        const ret = props.onInsertBiometria({ pessoa_id: props.pessoa_id, metrica_id: metrica_id, dados: values })
        if (ret) {
            setValue('')
            setMetricaId('')
        } else {
            alert('Erro ao cadastrar biometria.');
        }
    }

    return (
        <div className="container">
            <div className="h4">
         
                <h4>Biometria </h4>
            </div>
            
            {props.id}
            <div className="divCentral">
                <select className="form-metricas" value={metrica_id} onChange={(event) => setMetricaId(event.target.value)}>
                    <option value='0'>Selecione a métrica</option>
                    {metricas ? metricas.map(_metrica => (
                        <option value={_metrica.id}>{_metrica.nome}</option>
                    )) : <option value='0'>Nenhuma métrica encontrada.</option>}
                </select>
                <input className="ValorBio" type="number" name="dados" placeholder="Digite os dados correspondentes." value={values} onChange={(event) => setValue(event.target.value)} ></input>
            </div>
            <div >
                <MyButton className="buttonSalvar" onClick={handleInsertBiometria}  children={"Salvar"} ></MyButton>
            </div>
        </div>
        
    )
}

export default Biometria