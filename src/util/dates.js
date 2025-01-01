
export function formatarData(data) {
    data = new Date(data)
    const dia = String(data.getDate()).padStart(2, '0'); // Obtém o dia (2 dígitos)
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Obtém o mês (0-indexado, então soma 1)
    const ano = data.getFullYear(); // Obtém o ano completo
    const hora = String(data.getHours()).padStart(2, '0'); // Obtém a hora (2 dígitos)
    const minuto = String(data.getMinutes()).padStart(2, '0'); // Obtém os minutos (2 dígitos)

    
    return {
        fullDate(){
            return `${dia}-${mes}-${ano} ${hora}:${minuto}`;
        },
        shortDate(){
            return `${dia}-${mes}-${ano}`;
        },
        date(){
            return new Date(`${dia}-${mes}-${ano}`)
        }
    }
}