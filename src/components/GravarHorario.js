import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './GravarHorario.css'

function GravarHorario (props) {
    const [ horario, setHorario ] = useState('')
    const location = useLocation();
    const { id, nome } = location.state || {}; // Recupera o id do estado passado na navegação
    
    const onSubmitGravarHorarioHandler = (event) => {
        event.preventDefault();

        const horarios = { medicamento_id: id, horario_planejado: horario, status: 0 }

        fetch('http://localhost:3001/horarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(horarios),
          })
            .then((result) => result.json())
            .then((dados) => {
              if (dados) {
                alert(`Horário ${horario} gravado com sucesso para o medicamento ${nome}`)
                setHorario('')
              } else {
                alert("Problemas ao gravar horário do medicamento.");
              }
            })
            .catch((error) => console.error("Erro na autenticação:", error));
      
    }

    return (
        <div className="GravarHorario">
            <form onSubmit={onSubmitGravarHorarioHandler}>
                <h5>
                    Medicamento: {nome}
                </h5>
                <div>
                    <label>Horário</label>
                    <input
                        type="text"
                        name="horario"
                        placeholder="Digite o horário do medicamento"
                        value={horario}
                        onChange={(event) => setHorario(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Gravar</button>
                </div>
            </form>
            
        </div>
    )
    
}

export default GravarHorario