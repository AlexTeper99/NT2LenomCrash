import axios from 'axios'
import singleWalletService from "../services/singleWalletService.js"

const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getSingleWallet(id) {
        return apiClient.get('/api/getWalletById/' + id);
    },
    createWallet() {
        return apiClient.post('/api/createwallet');
    },
    deleteWallet(walletId, userId) {
        return apiClient.post('/api/wallet/deleteWallet', { data: { walletId: walletId, userId: userId } });
    },
    modificarWallet(wallet) {
        return apiClient.put('/api/updatewallet', wallet)
    }
}