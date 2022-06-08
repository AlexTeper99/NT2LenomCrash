import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MonedaView from "../views/MonedasView.vue";
import WalletListView from "../views/WalletListView.vue";
import SingleWalletView from "../views/SingleWalletView.vue";


const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
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
            component: MonedaView
        },
        {
            path: '/wallets',
            name: 'wallets',
            component: WalletListView
        },
        {
            path: '/singlewallet/:id',
            name: 'singlewallet',
            component: SingleWalletView
        }

    ]
})

export default router