import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './styles/Autenticacao.css';
import api from '../services/api'

function Autenticacao(props) {
  
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const navigate = useNavigate(); // Hook para navegação
  

  const onSubmitHandler = (event) => {
    event.preventDefault();
    

    const pessoa = { email, password };
    
    const retId = async () => {
      const response = await api.post('/auth', '', '', pessoa )
      setEmail('');
      setSenha('');
      if (response.id) {
        // Navega para o componente Pessoas e passa o id como estado
        navigate('/pessoas', { state: { id: response.id } });
      } else {
        alert("Autenticação falhou. Verifique suas credenciais.");
      }
    }
    retId()
  };

  const onClickHandler = (e, ema, msg) => {
    if (!ema) {
      e.preventDefault();
      alert(`Por favor, insira um email válido para ${msg}.`);
      return;
    }
    
    // Navega para o componente ResetarSenha e passa o email como estado
    
  }

  return (
    <form 
      onSubmit={onSubmitHandler}
      className="autenticacao"> 
      <h2>Autenticação</h2>
      <>
        <b>Email: </b>
        <input
          className="input"
          type="text"
          name="email"
          placeholder="Digite o seu email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </>
      <>
        <b>Senha: </b>
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Digite a senha"
          value={password}
          onChange={(event) => setSenha(event.target.value)}
          required
        />
      </>
      <>
          <NavLink  
            to="/cadastro-pessoa" 
            className="link-cadastro" 
            onClick={(e) => onClickHandler(e, email, 'criar uma conta')}
            style={{ textDecoration: 'none', fontSize: '10.5px', color: '#007bff', marginBottom: '10px' }}
            >
            Não tem uma conta? Cadastre-se aqui!
          </NavLink>
        
        <NavLink 
            to="/resetar-senha" 
            state={{ email }} 
            className="link-trocar-password" 
            onClick={(e) => onClickHandler(e, email, 'resetar a senha')} 
            style={{ textDecoration: 'none', fontSize: '10.5px', color: '#007bff', marginBottom: '10px' }}>
              Resetar senha
          </NavLink>
        
      </>
      <button type="submit">Enviar</button>        
    </form>
  );
}

export default Autenticacao;
