import React, { useState } from 'react';

const NovaListagemMedicamentos = () => {
    const [medicamentos, setMedicamentos] = useState([
        { nome: 'Paracetamol', horario: '08:00', estoque: 10 },
        { nome: 'Ibuprofeno', horario: '12:00', estoque: 5 },
        { nome: 'Amoxicilina', horario: '20:00', estoque: 7 },
    ]);

    const marcarIngerido = (index) => {
        const novosMedicamentos = [...medicamentos];
        novosMedicamentos[index].horarioIngerido = new Date().toLocaleTimeString();
        setMedicamentos(novosMedicamentos);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Nome do Medicamento</th>
                    <th>Horário para Tomar</th>
                    <th>Quantidade em Estoque</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                {medicamentos.map((medicamento, index) => (
                    <tr key={index}>
                        <td>{medicamento.nome}</td>
                        <td>{medicamento.horario}</td>
                        <td>{medicamento.estoque}</td>
                        <td>
                            <button onClick={() => marcarIngerido(index)}>
                                Marcar Ingerido
                            </button>
                            {medicamento.horarioIngerido && (
                                <span> Ingerido às {medicamento.horarioIngerido}</span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default NovaListagemMedicamentos;