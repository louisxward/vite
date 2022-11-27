import { createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import UserList from '../views/UserList.vue'
import User from '../views/User.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/about',
            component: () => import('../views/About.vue')
        },
        {
            path: '/userList',
            component: UserList
        },
        {
            path: '/user/:id',
            name: 'User',
            component: User
        },
        {
            path: '/contact',
            component: () => import('../views/Contact.vue')
        },
        {
            path: '/settings',
            component: () => import('../views/Settings.vue')
        }
    ]
})

export default router