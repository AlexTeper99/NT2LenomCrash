<template>
<div>
  <div class="unit-div single-wallet-select">
    <h2>Wallet Unica</h2>

    <p>Wallet: {{ wallet.id }}</p>
    
    <br/> 
    <p>Moneda: {{ wallet.coin.ticker }}</p>
     Saldo en moneda:  {{ wallet.coin.cantidad }}
  </div> 
  <div class="unit-div single-wallet-select">
      
    <p>Editar Wallet </p>
      <p>
        Ticker: <input class="input-coin" type="text" v-model="coinEdit.ticker" id="tickerLabel"/>  
       </p>
      <p>
        Cantidad: <input class="input-coin" type="text" v-model="coinEdit.cantidad" id="cantidadLabel"/>
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

import { storeToRefs } from "pinia";
import { usuarioStore } from "../stores/usuario";
import { useRoute } from "vue-router"
import singleWalletService from "../services/singleWalletService.js"

import walletListService from "../services/walletListService.js"
export default {
  setup() {
    const store = usuarioStore();
    const { userid, estaLogeado } = storeToRefs(store);
    
    return {
      store,
      estaLogeado,
      userid
    };
  },
  data() {
    return {
      coinEdit: {},
      wallet: {
        id: 0,
        coin: {
          ticker:null,
          cantidad:null
        },
      },
      mensajeError: "",
      walletCargada: false
    };
    },
  created: async function () {
    try {
      
      let walletId = this.$route.params.id;
      let wallet = await singleWalletService.getSingleWallet(walletId);
      this.wallet = await wallet.data;
      this.coinEdit = { ... wallet.data.coin };
      
    
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
      let coin = {... this.coinEdit};
      this.wallet.coin = coin;
      let updatedWallet = {... this.wallet };
      await singleWalletService.modificarWallet(updatedWallet);
    },
     async eliminarWallet() {
      
        let walletId = this.wallet.id;
        let userId = this.userid;
        // console.log(walletId)
        // console.log(userid)
        let res = await singleWalletService.deleteWallet(walletId, userId);
        if(res) {
            this.redirect();
        }

    },
    redirect() {
      // console.log('redirecting ... ');
        this.$router.push('/wallets');
    }
    },
};
</script>

<style scoped>
</style>