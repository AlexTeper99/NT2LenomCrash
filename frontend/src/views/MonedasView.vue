<template>
  <div>
    <h2>Monedas</h2>

    <li v-for="moneda in monedas" :key="moneda.ticker">
      {{ moneda.ticker }} - {{ moneda.nombre}} - ${{moneda.precio}}
      <button @click="eliminar(moneda.ticker)" v-if="eliminando">Eliminar</button>
      <button @click="editarPrecio(moneda)" v-if="editando">Editar</button>
    </li>

    <div>
      <br>
      <button @click="agregandoMoneda()">Agregar Moneda</button>
      <button @click="editandoMoneda()">Modificar Precio</button>
      <button @click="eliminandoMoneda()">Eliminar Moneda</button>
    </div>



    
      <div v-if="agregando">
      
      Ticker <input type="text" v-model="moneda.ticker" id="tickerLabel"/>
      <br>
      Nombre <input type="text" v-model="moneda.nombre" id="nombreLabel"/>
      <br>
      Precio <input type="text" v-model="moneda.precio" id="precioLabel"/>
      <br>
      </div>
    
      <button @click="agregar" v-if="agregando">Agregar moneda</button>

      <div v-if="modificando">
      {{monedaEdit.nombre}} <input type="text" id="nuevoPrecioLabel" v-model="precioNuevo"/>
      <button @click="actualizar">Actualizar</button>
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
      monedaEdit: {ticker: '', nombre: '', precio: 0},
      mensajeError: '',
      visible: true,
      agregando: false,
      modificando: false,
      eliminando: false,
      editando: false,
      precioNuevo: 0,
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

    editarPrecio(monedaRecibida) {
      this.precioNuevo = monedaRecibida.precio;
      this.modificando = true;
      this.monedaEdit = monedaRecibida;


    },

    agregandoMoneda() {
      if(this.agregando == true) {
        this.agregando = false;
      } else {
        this.agregando = true;
      }
    },

    editandoMoneda() {
      if(this.editando == true) {
        this.editando = false;
      } else {
        this.editando = true;
      }
    },

    eliminandoMoneda(){
      if(this.eliminando == true) {
        this.eliminando = false;
      } else {
        this.eliminando = true;
      }

    },

    async actualizar() {
      try {
        this.modificando = false;
      this.monedaEdit.precio = this.precioNuevo;
      monedasService.modificarMoneda(this.monedaEdit);
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