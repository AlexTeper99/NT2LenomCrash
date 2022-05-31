
// EXPRESS  ->   ESCUCHANDO EN PUERTO 8080
// EXPONE UNA API PARA ESCUCHAR

//  AXIOS CONSULTA A EXPRESS
//

import axios from 'axios'

// https://jsonplaceholder.typicode.com/posts

const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getUsuarios() {
        return apiClient.get('/api/usuarios');
    },
    setUsuarios(Usuarios) {
        return apiClient.post('/api/setUsuarios', Usuarios);
    },
    deleteUsuarios(codigo) {
        return apiClient.delete('/api/Usuarios/' + codigo);
    },
    modificarUsuarios(Usuarios) {
        // chequear
        return apiClient.put('/api/setUsuarios', Usuarios)
    }
}