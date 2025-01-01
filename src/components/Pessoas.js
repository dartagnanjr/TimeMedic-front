import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Pessoas.css";
import Pessoa from "./Pessoa";

function Pessoas() {
    const location = useLocation();
    const { id } = location.state || {}; // Recupera o id do estado passado na navegação
    const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    const url = `http://192.168.0.152:3001/pessoas/${id}`
    fetch(url, { 
        method: "GET",
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
            }
            return response.json();
        })
        .then((dados) => {
            if (dados) {
                const result = {
                    id: dados.id,
                    nome: dados.nome,
                    sobre_nome: dados.sobre_nome,
                    data_nascimento: dados.data_nascimento,
                    email: dados.email
                } 
                setPessoas(result);
            } else {
                throw new Error('Nenhum registro encontrado.')
            }
        })
        .catch((error) => console.error("Erro ao buscar pessoas:", error));
    
  }, [id]); // O array vazio faz com que o useEffect seja executado apenas na montagem

  return (
    <div>
      <Pessoa
          nome={pessoas.nome}
          id={pessoas.id}
          sobre_nome={pessoas.sobre_nome}
          data_nascimento={pessoas.data_nascimento}
          email={pessoas.email}
        />
    </div>
  );
}

export default Pessoas;
