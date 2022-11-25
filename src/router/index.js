import { createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Team from '../views/Team.vue'

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
            path: '/team',
            component: Team
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