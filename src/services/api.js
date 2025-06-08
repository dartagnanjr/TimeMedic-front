const { PORT, HOST } = process.env


function config() {  
    const confs = {
        port: 3001,
        host: '127.0.0.1',
        http: "http://"
    }
    return String().concat(confs.http, confs.host, ':', confs.port)
}

const api = {

    get: async (url, params = null, headers) => {
        const conf = config()
        let dd = []
        return await fetch(`${conf}${url}${params}`, {
            method: 'GET'
        }).then(result => (result.json()))
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
        const conf = config()
        let dd = []
        return await fetch(`${conf}${url}${params}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payLoad)
        }).then(result => (result.json()))
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
        const conf = config()
        let dd = []
        return await fetch(`${conf}${url}${params}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payLoad)
        }).then(result => (result.json()))
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
        const conf = config()
        let dd = []
        return await fetch(`${conf}${url}${params}`, {
            method: 'DELETE'
        }).then(result => (result.json()))
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