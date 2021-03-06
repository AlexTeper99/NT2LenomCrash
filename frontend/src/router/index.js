import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MonedasView from "../views/MonedasView.vue";
import WalletListView from "../views/WalletListView.vue";
import SingleWalletView from "../views/SingleWalletView.vue";
import Usuarios from "../views/Usuarios.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import SingleUserView from "../views/SingleUserView.vue";

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ('../views/AboutView.vue')
    },
    {
        path: '/monedas',
        name: 'monedas',
        component: MonedasView,
        meta: { requiresAuth: true }
    },
    {
        path: '/wallets',
        name: 'wallets',
        component: WalletListView,
        meta: { requiresAuth: true }
    },
    {
        path: '/singlewallet/:id',
        name: 'singlewallet',
        component: SingleWalletView,
        meta: { requiresAuth: true }
    },
    {
        path: '/singleuser/:id',
        name: 'singleuser',
        component: SingleUserView
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: Usuarios,
        meta: { requiresAuth: true }
    },
    { path: '/logout', component: Logout, meta: { requiresAuth: true } },
    { path: '/login', component: Login },
];


const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('usuario');
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/')
    }
    next()
})


export default router