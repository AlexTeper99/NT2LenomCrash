<template>
  <div>
    <h2>Alta de usuario</h2>
    <li v-for="usuario in lista" :key="usuario.codigo">
      {{ usuario.codigo }} {{ usuario.nombre }} <button @click="eliminar(usuario.codigo)">Siempre anular</button>
    </li>
    <p>
      Codigo <input type="text" v-model="usuario.codigo" /> Nombre
      <input type="text" v-model="usuario.nombre" />
      <button @click="agregar">Agregar usuario</button>
    </p>
    {{ mensajeError }}
  </div>
</template>

<script>
import usuariosService from "../services/usuariosService.js";
// import placeHolder from '../services/placeHolder.js';
export default {
  data() {
    return {
      lista: [],
      usuario: { codigo: 0, nombre: "" },
      mensajeError: "",
    };
  },
  created: async function () {
    try {
      const rta = await usuariosService.getUsuarios(); // ejemplo placeHolder.getDatos()
      this.lista = rta.data;
    } catch (error) {
      this.mensajeError = "No se pudo obtener los datos ";
      console.log(error.error);
    }
  },
  methods: {
    agregar() {
      try {
        const obj = {...this.usuario};
        usuariosService.setUsuarios(obj); 
        this.lista.push(obj);
      } catch (error) {
        this.mensajeError = "No se pudo obtener los datos ";
        console.log(error.error);
      }
    },
    eliminar(codigo) {
      try {

        // codigo pasado por Santiago, para revisar, como opcion
        // this.productos = this.productos.filter(elto => elto.id != idBorrar);

        usuariosService.deleteUsuarios(codigo);
        const listaCodigos = this.lista.map( e => { return e.codigo } )
        const indice = listaCodigos.indexOf(codigo)
        this.lista.splice(indice,1);

      } catch (error) {
        this.mensajeError = "No se pudo obtener los datos ";
        console.log(error.error);
      }

    }
  },
};
</script>

<style>
</style>