import { defineStore } from 'pinia'
import axios from 'axios'

export const usuarioStore = defineStore('main', {

    state: () => {
        return {
          usuario: {},
          estaLogeado: false,
          esAdmin: false
        }
    },    
    getters: {
    },
    actions: {
        async login(obj) {
            try {
                const data = await axios.post('http://localhost:3001/api/login',obj)

                //this.usuario = http/findUserByEmail/
                // console.log(data);
                this.usuario = obj;
                this.estaLogeado = true;
                this.esAdmin = false;

                if(this.usuario.email == "test@test.com"){
                   this.esAdmin = true;
                }

                localStorage.setItem('usuario',  JSON.stringify(this.usuario) )
            } catch(error) {
                console.log(error);
            }
        },
        logout() {
            this.usuario = {};
            this.estaLogeado = false;
            this.esAdmin = false;
            localStorage.removeItem('usuario');
            location.reload();
        }        
    },
})