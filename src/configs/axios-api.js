import axios from 'axios';

const axios_api = axios.create({
  baseURL: 'http://192.168.0.152:3001', // URL base do backend
  timeout: 10000, // Tempo máximo de espera (10s)
  headers: {
    'Content-Type': 'application/json',
    // Adicione outros headers (ex: token JWT)
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// Interceptores para tratamento global de erros
axios_api.interceptors.response.use(
  (response) => response.data, // Retorna apenas os dados da resposta
  (error) => {
    console.error('Erro na requisição:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axios_api;