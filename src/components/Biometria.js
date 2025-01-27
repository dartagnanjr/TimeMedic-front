import React, { useEffect, useState } from "react";
import './Biometria.css'
import MyButton from "../hooks/MyButton";


const Biometria = (props) => {
    const [ metricas, setMetricas ] = useState([])
    const [ values, setValue ] = useState('')
    const [ metrica_id, setMetricaId ] = useState('')

    useEffect(() => {

        fetch(`http://192.168.0.152:3001/metricas`, {
            method: 'GET'
        })
        .then(response => response.json()
        )
        .then(dados => {
            if (!dados.length){
                alert('Nenhum registro encontrado.')
                return
            }
            const metrica = dados.map(_met => {
                return {
                    id: _met.id,
                    metrica: _met.nome
                }
            })
            setMetricas(metrica)
            setMetricaId('')
        })
    }, [])

    
    const onClickSalvar = () => {
        const payLoad = {
            pessoa_id: props.pessoa_id,
            metrica_id: metrica_id,
            dados: values
        }
        fetch(`http://192.168.0.152:3001/biometria`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(payLoad)
        })
        .then(result => result.json()
        .then(dados => {
            if (!dados){
                alert('Problemas no cadastro da biometria')
                return
            } else {
                alert('Biometria cadastrada com sucesso.')
                setMetricaId('')
                setValue('')
                return
            }
        }))
        return
    }
    return (
        <div>
            <div className="h4">
                <h4>Biometria </h4>
            </div>
            
            {props.id}
            <div className="divCentral">
                <select className="form-metricas" value={metrica_id} onChange={(event) => setMetricaId(event.target.value)}>
                    {metricas.map(option => (
                        <option value={option.id}>{option.metrica}</option>
                    ))}
                </select>
                <input className="ValorBio" type="text" name="dados" placeholder="Digite os dados correspondentes." value={values} onChange={(event) => setValue(event.target.value)} ></input>
            </div>
            <div >
                <MyButton className="formButton" onClick={onClickSalvar} children={"Salvar"} ></MyButton>
            </div>
        </div>
        
    )
}

export default Biometria