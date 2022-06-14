<template>
  <div class="unit-div">
    <h2>Wallet Unica</h2>

    <p>Wallet: {{ wallet.id }}</p>
    
    <br/> 
    <p>Moneda: {{ coin.ticker }}</p>
     Saldo en moneda:  {{ coin.cantidad }}
  </div> 
    <br/>
    <br/>
  <div class="unit-div">
      
    <p>Editar Wallet </p>
      <p>
        Ticker: <input class="input-coin" type="text" v-model="wallet.coin.ticker" id="tickerLabel"/>  
        Cantidad: <input class="input-coin" type="text" v-model="wallet.coin.cantidad" id="cantidadLabel"/>
      </p>
        <br/>  
      <button class="button-4" role="button" @click="guardarWallet()">Guardar Cambios</button>
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
      singleWalletService.modificarWallet(updatedWallet);
    },
    
    
    eliminar(id) {
        console.log(id);
    },
    },
};
</script>

<style scoped>
</style>