import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../view/Login.vue'
import Register from '../view/register.vue'
import Mainview from '../view/mainview.vue'
import Selects from '../view/selects.vue'
import Order from '../view/order.vue'
import Comments from '../view/comments.vue'
import Backstage from '../view/backstage.vue'
Vue.use(VueRouter)


const routes = [
    {
        path:'/',
        name:'Login',
        component:Login
    },
    {
        path:'/register',
        name:'Register',
        component:Register
    },
    {
        path:'/mainview',
        name:'Mainview',
        component:Mainview,
        children:[
            {
                path:'/selects',
                name:'Selects',
                component:Selects
            },
            {
                path:'/order',
                name:'Order',
                component:Order
            },
            {
                path:'/comments',
                name:'Comments',
                component:Comments
            },
            {
                path:'/backstage',
                name:'Backstage',
                component:Backstage
            }
        ],redirect:'/selects'
    },
]

const router = new VueRouter({
    mode:'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
