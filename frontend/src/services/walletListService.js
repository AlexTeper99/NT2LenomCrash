import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getWallets(userId) {
        return apiClient.get('/api/wallets/' + userId);
    },
    createWallet(wallet, userid) {
        return apiClient.post('/api/wallets/createwallet', { data: { wallet: wallet, userid: userid } });
    },
    deleteWallet(id) {
        return apiClient.delete('/api/wallet/' + id);
    },
    modificarWallet(wallet) {
        return apiClient.put('/api/updatewallet', wallet);
    },
    getWalletLastId() {
        return apiClient.get('/api/wallets/getLastId');
    }

}