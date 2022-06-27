
<template>
  <div>
    <h2>Mis Wallets</h2>
    <div v-if="!this.estaLogeado">
      Por favor logueese para ver sus Wallets.
    </div>
    
    <div v-for="wallet in listaWallets" :key="wallet.id">
      <br/>
      
      <div class="single-wallet-select">
      <p>
        Moneda : {{ wallet.coin.ticker }} | Cantidad : {{ wallet.coin.cantidad }}
      </p>
        <button class="button-4" role="button" @click="editarWallet(wallet.id)">Editar Wallet</button>
      </div>

    </div>
    <div v-if="this.estaLogeado">
      <br/>  

      <h2>Agregar Wallet</h2>
      <div class="new-coin-div single-wallet-select">
      Datos de Nueva Billetera:
        ID: {{ newWallet.id }}
        <br />
        <div class="inputs-align">
          <p> Ticker Moneda </p>
            <input class="input-coin" type="text" v-model="newWallet.coin.ticker"/>
          <br>
          <p> Cantidad </p>
            <input class="input-coin" type="text" v-model="newWallet.coin.cantidad"/>
          <br>
        </div>
      </div>
      <br/>
      <button class="button-3" role="button" @click="agregarWallet()">Agregar Nueva Wallet -></button>
  
    </div>
  </div>
  
  
  <div>
  </div>


</template>

<script>
import { storeToRefs } from "pinia";
import { usuarioStore } from "../stores/usuario";
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
      listaWallets: [],
      wallet: {
        id: 0,
        coin: {
          ticker:null,
          cantidad:null
        },
      },
      newWallet: {
        id: 0,
        coin: {
          ticker:null,
          cantidad:null
        },
      },
      mensajeError: "",
      hasWallet: false
    };
    },
  mounted: async function () {
    if(this.estaLogeado) {
      this.getuserWallets();
    }
  },
  methods: {
    async getuserWallets() {
      try {
        
        let wallets = await walletListService.getWallets(this.userid);
        this.listaWallets = wallets.data;
        this.userIdData = this.userid;
    
      } catch (error) {
        this.mensajeError = "No se pudo obtener los datos";
          console.log(error.error);
      }
    },
    editarWallet(id) {
      this.$router.push('/singlewallet/'+id);
    },
    async agregarWallet() {
      try {
        let newWalletid = await walletListService.getWalletLastId();
        this.newWallet.id = newWalletid.data;
        
        let wnew = { ...this.newWallet };

        this.listaWallets.push(wnew);
        await walletListService.createWallet(wnew, this.userid);
        this.newWallet.id = 0;
        this.newWallet.coin.ticker = null;
        this.newWallet.coin.cantidad = null;
        
      
      } catch (error) {
        this.mensajeError = "No se pudo obtener los datos ";
        console.log(error.error);
      }
    },
    
    },
};
</script> 

<style scoped>

</style>