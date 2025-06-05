import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../hooks/MyButton';
import './styles/CadastroPessoa.css'; // Certifique-se de que o caminho está correto
import api from '../services/api'; // Certifique-se de que o caminho está correto

function CadastroPessoa() {
    const navigate = useNavigate(); // Hook para navegação
    const [form, setForm] = useState({
        nome: '',
        sobre_nome: '',
        data_nascimento: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados para uma API ou processar como desejar
        const payload = {
            nome: form.nome,
            sobre_nome: form.sobre_nome,
            data_nascimento: form.data_nascimento,
            email: form.email,
            password: form.password
        };
        api.post('/pessoas', '', '', payload)
            .then(response => {
                if (response) {
                    alert('Cadastro realizado com sucesso!');
                    setForm({
                            nome: '',
                            sobre_nome: '',
                            data_nascimento: '',
                            email: '',
                            password: ''
                        });
                    //navigate(-1); // Redireciona para a página anterior
                } else {
                    alert('Erro ao realizar o cadastro.');
                }
            })
            .catch(error => {
                console.error('Erro ao cadastrar:', error);
                alert('Erro ao realizar o cadastro.');
            });
        
        
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto' }} className='cadastro-pessoa'>
            <h2>Cadastro de Pessoa</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <b>Nome:</b>
                    <input
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <b>Sobrenome:</b>
                    <input
                        type="text"
                        name="sobre_nome"
                        value={form.sobre_nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <b>Data de Nascimento:</b>
                    <input
                        type="date"
                        name="data_nascimento"
                        value={form.data_nascimento}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <b>Email:</b>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <b>Senha:</b>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='div-botoes'>
                    <button className="cadastro-pessoa-button" type="submit">Cadastrar</button>
                    <MyButton className="cadastro-pessoa-button" onClick={() => navigate(-1)}>Cancelar</MyButton>
                </div>
                
            </form>
        </div>
    );
}

export default CadastroPessoa;