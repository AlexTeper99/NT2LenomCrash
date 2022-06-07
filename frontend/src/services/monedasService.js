
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
    getMonedas() {
        return apiClient.get('/api/monedas');
    },
    setMoneda(moneda) {
        return apiClient.post('/api/monedas/setmoneda', moneda);
    },
    deleteMoneda(ticker) {
        return apiClient.delete('/api/monedas/' + ticker);
    },
    modificarMoneda(moneda) {
        // chequear
        return apiClient.put('/api/monedas/modificarmoneda', moneda);
    }
}