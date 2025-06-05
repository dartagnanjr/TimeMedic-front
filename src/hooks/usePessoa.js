import { useState } from "react";
import api from "../services/api";

function usePessoa(props) {
    const [pessoa, setPessoa] = useState({});

    const setPessoaData = (data) => {
        if (!data) {
            console.error("Dados inválidos para setPessoaData");
            return;
        }
        setPessoa({
            id: data.id,
            nome: data.nome,
            sobre_nome: data.sobre_nome,
            data_nascimento: data.data_nascimento,
            email: data.email
        });
    };

    const createPessoa = async (params) => {
        const response = await api.post('/pessoas', '', '', params);
        return response.id;
    };

    const updatePessoa = async (params, id) => {
        const response = await api.put('/pessoas/', id, '', params);
        return response;
    };

    const getPessoa = async (id) => {
        const response = await api.get('/pessoas/', id);
        setPessoa(response);
        return response;
    };

    return { 
        pessoa, 
        setPessoaData, 
        createPessoa, 
        updatePessoa, 
        getPessoa 
    };
}
export default usePessoa;