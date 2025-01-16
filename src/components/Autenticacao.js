import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Autenticacao.css';

function Autenticacao(props) {
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const pessoa = { email, password };
 
    fetch('http://192.168.0.152:3001/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pessoa),
    })
      .then((result) => result.json())
      .then((dados) => {
        setEmail('');
        setSenha('');
        if (dados.id) {
          // Navega para o componente Pessoas e passa o id como estado
          navigate('/pessoas', { state: { id: dados.id } });
        } else {
          alert("Autenticação falhou. Verifique suas credenciais.");
        }
      })
      .catch((error) => console.error("Erro na autenticação:", error));
  };

  return (
    <div className="Autenticacao">
      <section>
          <form onSubmit={onSubmitHandler}> 
            <div>
              <div>
                <h2>Autenticação</h2>
              </div>
              <div>
                <label><strong>Email: </strong></label>
                <input
                  type="text"
                  name="email"
                  placeholder="Digite o seu email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <label><strong>Senha: </strong></label>
                <input
                  type="password"
                  name="password"
                  placeholder="Digite a senha"
                  value={password}
                  onChange={(event) => setSenha(event.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit">Enviar</button>
              </div>
            </div>
          </form>
      </section>
      
    </div>
  );
}

export default Autenticacao;
