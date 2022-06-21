<template>
  <div class="unit-div single-wallet-select">
    <h2>Mi perfil</h2>

    <p>Nombre: {{usuario.nombre}}</p>
    <p>Apellido: {{usuario.apellido}}</p>
    <p>Email: {{usuario.email}}</p>
    <p>Contraseña: {{usuario.password}}</p>


  </div>
</template>


<script>
import singleUserService from "../services/singleUserService.js";

export default{
 data(){
   return {
     usuarioEdit: {},
     usuario:{},
     mensajeError: "",
     usuarioCargado: false
   }
 },
  created: async function () {
    try {

      let userId = this.$route.params.id;
      let user = await singleUserService.getSingleUser(userId);
      this.usuario = user.data;
      this.usuarioEdit = { ... user.data};


    } catch (error) {
      this.mensajeError = "No se pudo obtener los datos";
      //console.log(error.error);
    }
  },

}





</script>

<style scoped>

</style>