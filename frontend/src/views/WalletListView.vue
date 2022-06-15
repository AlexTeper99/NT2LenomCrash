
<template>
  <div>
    <h2>Mis Wallets</h2>
    <br/>
    <div v-for="wallet in listaWallets" :key="wallet.id">
      <br/>
      
      <div class="single-wallet-select">
      <p>
        Moneda : {{ wallet.coin.ticker }} | Cantidad : {{ wallet.coin.cantidad }}
      </p>
      <button class="button-4" role="button" @click="editarWallet(wallet.id)">Editar Wallet</button>
            
      </div>

    </div>
  </div>
  
  <div>
  </div>


</template>

<script>
import walletListService from "../services/walletListService.js"
export default {
  data() {
    return {
      listaWallets: [],
      wallet: {
        id: null,
        coin: {
          id:null,
          ticker:null,
          cantidad:null
        },
      },
      mensajeError: "",
      hasWallet: false
    };
    },
  created: async function () {
    try {

        const res = await walletListService.getWallets();
        this.listaWallets = res.data;
    
    } catch (error) {
        this.mensajeError = "No se pudo obtener los datos";
        console.log(error.error);
    }
  },
  methods: {
    editarWallet(id) {
      this.$router.push('/singlewallet/'+id);
    },
    
    },
};
</script> 

<style scoped>

</style>