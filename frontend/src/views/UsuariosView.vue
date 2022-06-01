<template>
  <div>
    <h2>Alta de usuario</h2>
    <li v-for="user in lista" :key="user.codigo">
      {{ user.id }} {{ user.nombre }} {{user.apellido}} {{user.email}} <button @click="eliminar(user.codigo)">Eliminar</button>
    </li>
    <p>
        <div>
            ID <input type="text" v-model="usuario.id" />
        </div>
        <div>
            Nombre <input type="text" v-model="usuario.nombre" />
        </div>
        <div>
            Apellido <input type="text" v-model="usuario.apellido" />
        </div>
        <div>
            Email <input type="email" v-model="usuario.email" />
        </div>

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
 //     console.log(rta.data)
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