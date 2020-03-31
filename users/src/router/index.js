import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import UserDetails from "../views/UserDetails";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/user/:id',
        name: 'UserDetails',
        component: UserDetails,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
