import axios from "../configs/axios-api"
const { PORT, HOST, URL_TYPE } = process.env

const api = {

    get: async (url, params = null, headers) => {
        let dd = []
        return await axios.get(`${url}${params}`)    
        .then(dados => {
            if (dados) {
                if (Array.isArray(dados)){
                    dd = [ ...dados ]
                } else {
                    dd = { ...dados }
                }
            } else {
                throw new Error('Nenhum registro encontrado.')
            }
            return dd
        })
        .catch(err => { throw new Error(err)})
    },
    post: async (url, params = null, headers, payLoad) => {
        let dd = []
        return await axios.post(`${url}${params}`, payLoad)
        .then(dados => {
            if (dados) {
                if (Array.isArray(dados)){
                    dd = [ ...dados ]
                } else {
                    dd = { ...dados }
                }
                
            } else {
                throw new Error('Nenhum registro encontrado.')
            }
            return dd
        })
        .catch(err => { throw new Error(err)})
        
    },
    put: async (url, params = null, headers = null, payLoad) => {
        let dd = []
        return await axios.put(`${url}${params}`, payLoad)
        .then(dados => {
            if (dados) {
                dd = { ...dados }
                
            } else {
                throw new Error('Nenhum registro encontrado.')
            }
            return dd
        })
        .catch(err => { throw new Error(err)})
        
    },
    delete: async (url, params = null, headers) => {
        let dd = []
        return await axios.delete(`${url}${params}`)
        .then(dados => {
            if (dados) {
                dd = { ...dados }
                
            } else {
                throw new Error('Nenhum registro encontrado.')
            }
            return dd
        })
        .catch(err => { throw new Error(err)})
        
    }

}

export default api