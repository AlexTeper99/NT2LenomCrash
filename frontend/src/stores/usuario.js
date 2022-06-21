import { defineStore } from 'pinia'
import axios from 'axios'

export const usuarioStore = defineStore('main', {

    state: () => {
        return {
            usuario: {},
            estaLogeado: false,
            esAdmin: false,
            userid: 0
        }
    },
    getters: {},
    actions: {
        async login(obj) {
            try {
                await axios.post('http://localhost:3001/api/login', obj);

                let email = obj.email;
                let sendEmail = { email: email }
                let user = await axios.post('http://localhost:3001/api/usuarios/findUserByEmail', sendEmail);


                this.userid = user.data.id;
                this.usuario = obj;
                this.estaLogeado = true;
                this.esAdmin = false;


                if (this.usuario.email == "test@test.com") {
                    this.esAdmin = true;
                }
                localStorage.setItem('usuario', JSON.stringify(this.usuario))
            } catch (error) {
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