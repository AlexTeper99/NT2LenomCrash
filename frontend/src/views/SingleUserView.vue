<template>
  <div class="unit-div single-wallet-select">
    <h2>Mi perfil</h2>

    <p>Nombre: {{usuario.nombre}}</p>
    <p>Apellido: {{usuario.apellido}}</p>
    <p>Email: {{usuario.email}}</p>
    <p>Contraseña: {{usuario.password}}</p>

  </div>

  <br/>
  <div class="unit-div single-wallet-select">

    <p>Editar Usuario </p>

      <p>
      Nombre: <input class="input-coin" type="text" v-model="usuarioEdit.nombre" id="nombreLabel"/>
     </p>
    <p>
      Apellido: <input class="input-coin" type="text" v-model="usuarioEdit.apellido" id="apellidoLabel"/>
    </p>
    <p>
      Email: <input class="input-coin" type="email" v-model="usuarioEdit.email" id="emailLabel"/>
    </p>
    <p>
      Contraseña: <input class="input-coin" type="text" v-model="usuarioEdit.password" id="passwordLabel"/>
    </p>

    <br/>
    <button class="button-3" role="button" @click="guardar()">Guardar Cambios</button>
  </div>

</template>


<script>
import singleUserService from "../services/singleUserService.js";
import singleWalletService from "../services/singleWalletService";

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

  methods:{
    async guardar() {
      let user = {... this.usuarioEdit};
      this.usuario = user;
      let updateUser = {... this.usuario };
      await singleUserService.modificarUsuario(updateUser)
    }
  }

}





</script>

<style scoped>

</style>