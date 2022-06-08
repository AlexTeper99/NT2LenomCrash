
<template>
  <div>
    <h2>Wallet Unica</h2>
    {{ $route.params }}
  </div>
</template>

<script>
import singleWalletService from "../services/singleWalletService.js"
export default {
  data() {
    return {
      listaCoins: [],
      wallet: { id: 0, ticker: "", cantidad: 0 },
      mensajeError: "",
    };
    },
  created: async function () {
    try {

        const res = await singleWalletService.getWallets();
        this.listaWallets = res.data;
    
    } catch (error) {
        this.mensajeError = "No se pudo obtener los datos";
        console.log(error.error);
    }
  },
  methods: {
    
    eliminar(id) {

        console.log(id);
    

    }
    },
};
</script>

<style scoped>

</style>