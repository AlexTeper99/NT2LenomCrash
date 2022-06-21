import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getSingleUser(id) {
        return apiClient.get('/api/getUsuariosById/' + id);
    },
    deleteUsuario(codigo) {
        return apiClient.delete('/api/usuarios/' + codigo);
    },
    modificarUsuario(Usuario) {
        // chequear
        return apiClient.put('/api/usuarios/updateusuario', Usuario)
    }
}