import React, { Component } from 'react';
import './Pessoas.css'
import Pessoa from './Pessoa';

class Pessoas extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            pessoas: []  
        }
        //this.atualiza = this.atualiza.bind(this)
        //this.fetchData = this.fetchData.bind(this)
    }
    atualiza(){
        const resultado = fetch('https://localhost:3001/pessoas')
        console.log(resultado.data)

        this.setState({ pessoas: resultado })
    }

   
    componentDidMount(){
        
        fetch('http://localhost:3001/pessoas', { method: 'GET'
         })
        .then(Response => {
            if (!Response.ok){
                throw new Error(`Erro: ${Response.status}`)
            }
            return Response.json()
        })
        .then(dados => {
            const result = dados.map(_pessoa => {
                return {
                    key: _pessoa.id,
                    nome: _pessoa.nome,
                    sobre_nome: _pessoa.sobre_nome,
                    data_nascimento: _pessoa.data_nascimento,
                    email: _pessoa.email,
                }
            })
            this.setState({ pessoas: result })
        })
        .catch(err => { throw new Error(err.message)})
    }

    render(){
        return (
            <div>
               {this.state.pessoas.map((_pessoa) => (
                        <Pessoa 
                            nome={_pessoa.nome}
                            key={_pessoa.key}
                            sobre_nome={_pessoa.sobre_nome}
                            data_nascimento={_pessoa.data_nascimento}
                            email={_pessoa.email}>
                        </Pessoa>
                ))}
            </div>
        )
    }
}

export default Pessoas;