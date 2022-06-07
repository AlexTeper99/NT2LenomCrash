
<template>
  <div>
    <h2>Mis Wallets</h2>
    <br/>
    <div v-for="wallet in listaWallets" :key="wallet.id">
      <button @click="getWallet(wallet.id)">Ver Wallet {{wallet.id}}</button>
      
      <p v-for="coin in wallet.coins" :key="coin.id">
        Moneda : {{ coin.ticker }} | Cantidad : {{ coin.cantidad }} | Saldo: {{ getSaldo(coin.ticker,coin.cantidad) }}
      </p>
      
      <br/>
      _______________________________________________
      <br/>
    </div>
  </div>
  
  <div>
    
    <!-- wallet elegida -->
    <code>
    <div v-if="hasWallet">
      <p>Wallet Elegida:</p>
      {{ selectedWallet }}  
      
      <p v-for="coin in selectedWallet.coins" :key="coin.id">
        Moneda : {{ coin.ticker }}, Cantidad : {{ coin.cantidad }}
      </p>
    </div>
    </code>
  </div>


</template>

<script>
import walletListService from "../services/walletListService.js"
import singleWalletService from "../services/singleWalletService.js"
export default {
  data() {
    return {
      listaWallets: [],
      wallet: {
        id: null,
        coins: [{
          id:null,
          cantidad:null
        }],
      },
      mensajeError: "",
      selectedWallet: {
        id: null,
        coins: [{
          id:null,
          cantidad:null
        }],
      },
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
    // agregar() {
    //   try {
    //     const obj = {...this.vendedor};
    //     vendedorService.setVendedor(obj); 
    //     this.lista.push(obj);
    //   } catch (error) {
    //     this.mensajeError = "No se pudo obtener los datos ";
    //     console.log(error.error);
    //   }
    // },
    eliminar(id) {

        console.log(id);
    //   try {

        
    //     // this.productos = this.productos.filter(elto => elto.id != idBorrar);

    //     vendedorService.deleteVendedor(codigo);
    //     const listaCodigos = this.lista.map( e => { return e.codigo } )
    //     const indice = listaCodigos.indexOf(codigo)
    //     this.lista.splice(indice,1);

    //   } catch (error) {
    //     this.mensajeError = "No se pudo obtener los datos ";
    //     console.log(error.error);
    //   }

    },
    getWallet(id) {
      this.hasWallet = true;
      this.selectedWallet = this.listaWallets.filter(wallet => wallet.id === id);
      console.log(this.selectedWallet);
    },
    getSaldo(ticker,cantidad) {
      return 132;
    },
    },
};
</script> 

<style scoped>

</style>