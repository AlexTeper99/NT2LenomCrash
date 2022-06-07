
<template>
  <div>
    <h2>Wallet</h2>
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

    }
    },
};
</script>

<style scoped>

</style>