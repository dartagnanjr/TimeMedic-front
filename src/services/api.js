import React from "react";
const { PORT, HOST } = process.env


function config() {  
    const confs = {
        port: 3001,
        host: '192.168.0.152',
        http: "http://"
    }
    return String().concat(confs.http, confs.host, ':', confs.port)
}

const api = {

    get: async (url, params = null, headers) => {
        const conf = config()
        try {
            return fetch(`${conf}${url}${params.id}`, {
                method: 'GET'
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default api