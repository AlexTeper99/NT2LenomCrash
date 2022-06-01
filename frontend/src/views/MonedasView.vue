<template>
  <div>
    <h2>Monedas</h2>

    <li v-for="moneda in monedas" :key="moneda.ticker">
      {{ moneda.ticker }} - {{ moneda.nombre}} - ${{moneda.precio}}
      <button @click="eliminar(moneda.ticker)">Eliminar</button>
      <button @click="prepararModificar(moneda)">Modificar</button>
    </li>

    <p>
      Ticker <input type="text" v-model="moneda.ticker" id="tickerLabel"/>
      <br>
      Nombre <input type="text" v-model="moneda.nombre" id="nombreLabel"/>
      <br>
      Precio <input type="text" v-model="moneda.precio" id="precioLabel"/>
      <br>
    </p>
      <button @click="agregar">Agregar moneda</button>

      <div v-if="visible">
      <br>
      Precio <input type="text" v-model="moneda.precio" id="nuevoPrecioLabel"/> 
      <button @click="modificarPrecio(moneda, precioNuevo)">Modificar Precio</button>
      <br>
      </div>
    
  
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
      visible: true,
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
        monedasService.setMoneda(obj); 
        this.monedas.push(obj);
      } catch (error) {
        this.mensajeError = "No se pudo obtener los datos ";
        console.log(error.error);
      }
    },
    async eliminar(tickerBorrar) {
      try {

      // codigo pasado por Santiago, para revisar, como opcion
      this.monedas = this.monedas.filter(elto => elto.ticker != tickerBorrar);
      monedasService.deleteMoneda(tickerBorrar);
      //this.monedas = await monedasService.getMonedas;

      

      } catch (error) {
        this.mensajeError = "No se pudo obtener los datos ";
        console.log(error.error);
      }

    },
    prepararModificar(monedaRecibida) {
      console.log(monedaRecibida);
      this.visible = true;
    },

    modificarPrecio(monedaRecibida, nuevoPrecio) {
      
    }

  },
};





</script>


<style scoped>

</style>