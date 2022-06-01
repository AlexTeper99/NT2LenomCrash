<template>
  <div>
    <h2>Monedas</h2>

    <li v-for="moneda in monedas" :key="moneda.ticker">
      {{ moneda.ticker }} - {{ moneda.nombre}}
    </li>
  
  
  
  </div>



  
</template>






<script>
import monedasService from '../services/monedasService.js'

export default {
  data(){
    return {
      monedas: [],
      moneda: {ticker: '', nombre: '', precio: 0},
      mensajeError: '',
    };
  },
  created: async function () {
    try {
      const rta = await monedasService.getMonedas();
      this.monedas = rta.data;
    } catch (error) {
      this.mensajeError = "no se pueden obtener los datos";
      console.log(error.error);
    }
  },
  methods: {
   agregar() {
      try {
        const obj = {...this.moneda};
        monedaService.setMoneda(obj); 
        this.monedas.push(obj);
      } catch (error) {
        this.mensajeError = "No se pudo obtener los datos ";
        console.log(error.error);
      }
    },
    eliminar(ticker) {
      try {

        // codigo pasado por Santiago, para revisar, como opcion
        // this.productos = this.productos.filter(elto => elto.id != idBorrar);

        monedaService.deleteMoneda(ticker);
        const listaMonedas = this.monedas.map( e => { return e.ticker } )
        const indice = listaMonedas.indexOf(ticker)
        this.lista.splice(indice,1);

      } catch (error) {
        this.mensajeError = "No se pudo obtener los datos ";
        console.log(error.error);
      }

    }
  },
};





</script>


<style scoped>

</style>