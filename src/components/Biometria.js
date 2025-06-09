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
    } = useBiometria(props.pessoa_id)

    useEffect(() => {

        getMetricas()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getBiometrias()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <h4 style={{ color: "#5a42e2"}}>Biometria </h4>
            <select className="form-metricas" value={metrica_id} onChange={(event) => setMetricaId(event.target.value)}>
                <option value='0'>Selecione a métrica</option>
                {metricas ? metricas.map(_metrica => (
                    <option value={_metrica.id}>{_metrica.nome}</option>
                )) : <option value='0'>Nenhuma métrica encontrada.</option>}
            </select>
            <input className="ValorBio" type="number" name="dados" placeholder="Digite o valor." value={values} onChange={(event) => setValue(event.target.value)} ></input>
            {props.id}
            <div >
                <MyButton className="buttonSalvar" onClick={handleInsertBiometria}  children={"Adicionar"} ></MyButton>
            </div>
        </div>
        
    )
}

export default Biometria