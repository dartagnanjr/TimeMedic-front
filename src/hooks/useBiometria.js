import { useState } from 'react';
import api from '../services/api';

const useBiometria = (idPessoa) => {
    const [biometria, setBiometrias ] = useState([]);
    const [metricas, setMetricas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const getMetricas = async () => {
        try {
            const response = await api.get('/metricas', '');
            setMetricas(response);
        } catch (err) {
            //setError(err);
        } finally {
            //setLoading(false);
        }
    };

    const getBiometrias = async () => {
        const response = await api.get(`/biometria/pessoa/`, idPessoa );
        setBiometrias(response);
    }

    const setBiometria = async (biometria) => {
        try {
            const response = await api.post('/biometria', '', '', biometria);
            setBiometrias(response);
            return response
        } catch (err) {
            //setError(err);
        } finally {
            //setLoading(false);
        }
    };

    const onInsertBiometria = async (biometria) => {
        try {
            const response = await api.post('/biometria', '', '', biometria);
            if (!response) {
                alert('Erro ao cadastrar biometria.')
                return
            }
            const result = await api.get(`/biometria/pessoa/`, idPessoa );
            if (!result) {
                alert('Erro ao buscar biometrias.')
                return
            }
            setBiometrias(result);
            setLoading(true);
            alert('Biometria cadastrada com sucesso.')
            return result
        } catch (err) {
            //setError(err);
        } finally {
            //setLoading(false);
        }
    }
    return { 
        biometria, 
        metricas, 
        loading, 
        error,

        setLoading,
        getMetricas, 
        setBiometria, 
        getBiometrias,
        onInsertBiometria
     };
};

export default useBiometria;