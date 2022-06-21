<template>
  <div>
    <h2>Usuarios</h2>

    <li class="coin-list" v-for="usuario in usuarios" :key="usuario.id">
      {{ usuario.id }} - {{ usuario.nombre}} - {{usuario.apellido}} - {{usuario.email}}
      <button class="button-3 danger" role="button" @click="eliminar(usuario.id)" v-if="true">Eliminar</button>
    </li>


  </div>
</template>

<script>

import usuariosService from "../services/usuariosService.js";
import monedasService from "../services/monedasService";


export default {
  data(){
    return {
      usuarios: [],
      usuario: { id: '', nombre: '', apellido: '', email: '', password: '', listawallets: [] },
      usuarioEdit: {id: '', nombre: '', apellido: '', email: '', password: '', listawallets: [] },
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
      const rta = await usuariosService.getUsuarios();
      this.usuarios = rta.data;
    } catch (error) {
      this.mensajeError = "no se pueden obtener los datos";
      console.log(error.error);
    }
  },
  methods: {
    async eliminar(usuarioId) {
      try {

        // codigo pasado por Santiago, para revisar, como opcion
        this.usuarios = this.usuarios.filter(elto => elto.id != usuarioId);
        usuariosService.deleteUsuarios(usuarioId);
        //this.monedas = await monedasService.getMonedas;



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