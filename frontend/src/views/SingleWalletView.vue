
<template>
  <div>
    <h2>Wallet Unica</h2>

    {{this.wallet}}

  </div>


</template>

<script>
import {useRoute} from "vue-router"
import singleWalletService from "../services/singleWalletService.js"
export default {
  data() {
    return {
      listaCoins: [],
      wallet: {},
      mensajeError: "",
      idWallet: 0,
      walletCargada: false
    };
    },
  created: async function () {
    try {
      console.log('entre al created')

      this.idWallet = this.$route.params.id;

      this.wallet = await singleWalletService.getSingleWallet(this.idWallet);
      this.wallet = this.wallet.data;

    
    } catch (error) {
        this.mensajeError = "No se pudo obtener los datos";
        //console.log(error.error);
    }
  },
  methods: {
    
    eliminar(id) {
        console.log(id);
    },


    },
};
</script>

<style scoped>

</style>