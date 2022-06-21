<template>
  <div>
    <h2>Logout</h2>
    <button @click="logout">Salir</button>
  </div>
</template>

<script>
import {usuarioStore} from "../stores/usuario";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = usuarioStore();
    const { estaLogeado } = storeToRefs(store);
    const { logout } = store;
    return {
      store,
      estaLogeado,
      logout,
    };
  },

  methods: {
    logout() {
        this.logout();
        this.$router.push("/");
    },
  },
};
</script>

<style>
</style>