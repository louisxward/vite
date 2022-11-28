import { createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import UserList from '../views/UserList.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import client from '../pocketbase'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            component: Home,
            meta: { requiresAuth: true },
        },
        {
            path: '/about',
            component: () => import('../views/About.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/userList',
            component: UserList,
            meta: { requiresAuth: true },
        },
        {
            path: '/user/:id',
            name: 'User',
            component: User,
            meta: { requiresAuth: true },
        },
        {
            path: '/contact',
            component: () => import('../views/Contact.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/settings',
            component: () => import('../views/Settings.vue'),
            meta: { requiresAuth: true },
        },
        { 
            path: '/:pathMatch(.*)',
            component: NotFound }

    ]
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !client.authStore.isValid) {
        console.log("please login")
        return {
            path: "/login"
        }
    }
})

export default router