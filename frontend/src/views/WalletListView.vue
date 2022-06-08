
<template>
  <div>
    <h2>Mis Wallets</h2>
    <br/>
    <div v-for="wallet in listaWallets" :key="wallet.id">
      <button @click="editarWallet(wallet.id)">Editar Wallet {{wallet.id}}</button>
      
      {{wallet.coin}}
      
      <br/>
      _______________________________________________
      <br/>
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
    editarWallet(id) {
      this.$router.push('/singlewallet/'+id);
    },
    
    },
};
</script> 

<style scoped>

</style>