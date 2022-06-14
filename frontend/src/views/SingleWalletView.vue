<template>
<div>
  <div class="unit-div single-wallet-select">
    <h2>Wallet Unica</h2>

    <p>Wallet: {{ wallet.id }}</p>
    
    <br/> 
    <p>Moneda: {{ coin.ticker }}</p>
     Saldo en moneda:  {{ coin.cantidad }}
  </div> 
  <div class="unit-div single-wallet-select">
      
    <p>Editar Wallet </p>
      <p>
        Ticker: <input class="input-coin" type="text" v-model="wallet.coin.ticker" id="tickerLabel"/>  
        Cantidad: <input class="input-coin" type="text" v-model="wallet.coin.cantidad" id="cantidadLabel"/>
      </p>
        <br/>  
      <button class="button-3" role="button" @click="guardarWallet()">Guardar Cambios</button>
  </div>
  <div class="unit-div single-wallet-select">
      
    <p> - Eliminar Wallet - </p>
      
        <br/>  
    
    <button class="button-3 danger" role="button" @click="eliminarWallet()">Eliminar Wallet</button>
  </div>
  
  

</div>
</template>

<script>
import { useRoute } from "vue-router"
import singleWalletService from "../services/singleWalletService.js"
export default {
  data() {
    return {
      coin: {},
      wallet: {},
      mensajeError: "",
      walletCargada: false
    };
    },
  created: async function () {
    try {
      
      let walletId = this.$route.params.id;
      let wallet = await singleWalletService.getSingleWallet(walletId);
      this.wallet = wallet.data;
      this.coin = wallet.data.coin;
      
    
    } catch (error) {
        this.mensajeError = "No se pudo obtener los datos";
        //console.log(error.error);
    }
  },
  methods: {
    async getWallet() {
      let walletId = this.$route.params.id;
      let wallet = await singleWalletService.getSingleWallet(walletId);
    },
    async guardarWallet() {
      let updatedWallet = {... this.wallet };
      await singleWalletService.modificarWallet(updatedWallet);
    },
    async eliminarWallet() {
        let id = this.wallet.id;
        await singleWalletService.deleteWallet(id).then(function() {
          this.$router.push('/wallets');
        });
        
    },
    },
};
</script>

<style scoped>
</style>