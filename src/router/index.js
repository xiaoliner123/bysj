import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../view/Login.vue'
import Parson from '../view/parson.vue'

Vue.use(VueRouter)


const routes = [
    {
        path:'/',
        name:'Login',
        component:Login
    },
    {
        path:'/parson',
        name:'Parson',
        component:Parson
    }
]

const router = new VueRouter({
    mode:'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
