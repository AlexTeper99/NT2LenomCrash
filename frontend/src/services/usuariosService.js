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
        return apiClient.post('/api/usuarios/setusuarios', Usuarios);
    },
    deleteUsuarios(codigo) {
        return apiClient.delete('/api/usuarios/' + codigo);
    },
    modificarUsuarios(Usuarios) {
        // chequear
        return apiClient.put('/api/usuarios/modificarusuario', Usuarios)
    }


}