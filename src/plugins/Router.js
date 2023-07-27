import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage'
import SignIn from "@/views/SignIn";
import MapView from "@/views/MapView";


const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },

    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/map',
        name: 'Map',
        component: MapView
    },
    {
        // path: '/about',
        // name: 'About',
        // // route level code-splitting
        // // this generates a separate chunk (about.[hash].js) for this route
        // // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
