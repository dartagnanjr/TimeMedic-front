import React, { Component } from "react";
import Medicamento from "./Medicamento";

class Medicamentos extends Component {
    constructor(props){
        super(props)
        this.state = {
            medicamentos: []
        }

    }

    componentDidMount(){
        
        fetch('http://192.168.0.152:3001/medicamentos', { method: 'GET'
         })
        .then(Response => {
            if (!Response.ok){
                throw new Error(`Erro: ${Response.status}`)
            }
            return Response.json()
        })
        .then(dados => {
            const result = dados.map(_medicamento => {
                return {
                    key: _medicamento.id,
                    nome: _medicamento.nome,
                    dosagem: _medicamento.dosagem,
                    prescricao: _medicamento.prescricao,
                    laboratorio: _medicamento.laboratorio,
                }
            })
            this.setState({ medicamentos: result })
        })
        .catch(err => { throw new Error(err.message)})
    }

    render(){
        return (
            <div>
                {this.state.medicamentos.map((_medicamento) => (
                            <Medicamento 
                                key={_medicamento.key}
                                nome={_medicamento.nome}
                                dosagem={_medicamento.dosagem}
                                prescricao={_medicamento.prescricao}
                                laboratorio={_medicamento.laboratorio}>
                            </Medicamento>
                    ))}
            
            </div>
        )
        
    }
}

export default Medicamentos