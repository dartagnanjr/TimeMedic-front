import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/ResetarSenha.css';
import api from '../services/api'
import MyButton from '../hooks/MyButton'; // Certifique-se de que o caminho está correto

function ResetarSenha(props) {
    
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate(); // Hook para navegação
    const location = useLocation(); // Hook para acessar o estado da navegação
    const { email } = location.state || {}; // Recupera o email do estado passado na navegação
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (novaSenha !== confirmarSenha) {
            setMensagem('As senhas não coincidem.');
            return;
        }
        setCarregando(true);
        setMensagem('');
        try {
            const payload = {
                    email,
                    novaSenha
                };
            const ret = async () => {
                const resposta = await api.post('/resetar-senha', '', '', payload )
                if (resposta.mensagem === 'ok') {
                    setNovaSenha('');
                    setConfirmarSenha('');
                    navigate(-1); // Redireciona para a página de login após redefinir a senha
                    setMensagem('Senha redefinida com sucesso!');
                } else {
                    setMensagem('Erro ao redefinir a senha.');
                }
            }
            ret()
            
        } catch (error) {
            setMensagem('Erro de conexão.');
        }
        setCarregando(false);
    };

    return (
        <form onSubmit={handleSubmit} className="resetar-senha-form" >
            <h2>Redefinir Senha</h2>
            <div>
                <b>Email:</b>
                <input type="email" value={email} disabled />
            </div>
            <div>
                <b>Nova Senha:</b>
                <input
                    type="password"
                    value={novaSenha}
                    onChange={e => setNovaSenha(e.target.value)}
                    required
                />
            </div>
            <div>
                <b>Confirmar Nova Senha:</b>
                <input
                    type="password"
                    value={confirmarSenha}
                    onChange={e => setConfirmarSenha(e.target.value)}
                    required
                />
            </div>
            <div >
                <button type="submit" disabled={carregando} className="resetar-senha-buttons">
                    {carregando ? 'Redefinindo...' : 'Redefinir Senha'}
                </button>
                <MyButton onClick={() => navigate(-1)} className="resetar-senha-buttons">Cancelar</MyButton>
                {mensagem && <p>{mensagem}</p>}
            </div>
            
            
        </form>
        
    );
}

export default ResetarSenha;