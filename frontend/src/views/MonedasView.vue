<template>
  <div>
    <h2>Monedas</h2>
    <div>
    <li class="coin-list" v-for="moneda in monedas" :key="moneda.ticker">
      {{ moneda.ticker }} - {{ moneda.nombre}} - ${{moneda.precio}}
      <button class="button-3 danger" role="button" @click="eliminar(moneda.ticker)" v-if="eliminando">Eliminar</button>
      
      <button class="button-4" role="button" @click="editarPrecio(moneda)" v-if="editando">Editar</button>
    
    </li>
    </div>

    <div>
      <br>
      <button class="button-3" role="button" @click="agregandoMoneda()">Agregar Moneda</button> | 
      <button class="button-3" role="button" @click="editandoMoneda()">Modificar Precio</button> |
      <button class="button-3 danger" role="button" @click="eliminandoMoneda()">Eliminar Moneda</button>
    </div>



    
      <div class="new-coin-div" v-if="agregando">
      
        Datos de Nueva Moneda:
        <br />
        <div class="inputs-align">
          <p> Nombre </p>
          <input class="input-coin" type="text" v-model="moneda.nombre" id="nombreLabel"/>
          <br>
          
          <p> Ticker </p>
          <input class="input-coin" type="text" v-model="moneda.ticker" id="tickerLabel"/>
          <br>
          
          <p> Precio (USD) </p>
          <input class="input-coin" type="text" v-model="moneda.precio" id="precioLabel"/>
          <br>
        </div>
      </div>
      <br/>
      <button class="button-3" role="button" @click="agregar" v-if="agregando">Agregar Nueva Moneda -></button>

      <div v-if="modificando">
      <p>{{ monedaEdit.nombre }} </p>
      Precio Nuevo: <input class="input-coin input-sm" type="text" id="nuevoPrecioLabel" v-model="precioNuevo"/>
      
      | <button class="button-3" role="button" @click="actualizar">Actualizar</button>
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
        monedasService.modificarMoneda({...this.monedaEdit});
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