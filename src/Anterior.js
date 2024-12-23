import React, { Component } from 'react';
import './App.css';

import Comentario from './components/Comentario';

class App extends Component {
  state = {
    comentarios: [
      {
        id: 1,
        nome: 'Dartagnan',
        email: 'dartagnan.jr@gmail.com',
        data: new Date(1961, 12, 30),
        mensagem: `Olá tudo bem, eu sou dartagnan`
      },
      {
        id: 2,
        nome: 'Anália',
        email: 'eunalihinha.jr@gmail.com',
        data: new Date(1964, 4, 19),
        mensagem: `Olá tudo bem, eu sou Anália`
      }
    ],
    novoComentario: {
      nome: '',
      email: '',
      mensagem: ''
    }
  }
  adicionarComentario = evento => {

    evento.preventDefault();
    const novoComentario = { ...this.state.novoComentario, data: new Date() }
    this.setState({
      comentarios: [ ...this.state.comentarios, novoComentario ],
      novoComentario: { nome: '', email: '', mensagem: '' }
    }
    )
  }

  digitaNome = evento => {
    const { name, value } = evento.target;
    this.setState({ novoComentario: { ...this.state.novoComentario, [name]: value }})
  }

  render(){
    return (
      <div className="App">
        <h1>Meu primeiro projeto.</h1>
        
        {this.state.comentarios.map((_coment, indice) => (
            <Comentario 
              key={indice}
              nome={_coment.nome}
              email={_coment.email} 
              data={_coment.data}>
              {_coment.mensagem}
            </Comentario>
      ))}
        {/* <form method="post" onSubmit={this.adicionarComentario}>
          <h2>Adicionar Comentario</h2>
          <div>
            <input 
              type='text' 
              name='nome'
              value={this.state.novoComentario.nome}
              onChange={this.digitaNome}
              placeholder='Digite seu nome'>
            </input>
          </div>
          <div>
            <input 
              type='email' 
              name='email'
              value={this.state.novoComentario.email}
              onChange={this.digitaNome}
              placeholder='Digite seu email'>
            </input>
          </div>
          <div>
            <textarea 
              name="mensagem" 
              value={this.state.novoComentario.mensagem}
              onChange={this.digitaNome}
              rows="4" >
            </textarea>
          </div>
          <button onClick={this.adicionarComentario}>Adicionar Comentario</button>
        </form> */}
      </div>
    );
  }

}

export default App;
