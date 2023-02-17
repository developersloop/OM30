import Vue from 'vue'
import Router from 'vue-router'
import { isAuthenticated } from '@/utils'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: () => import('@/components/login/Login.vue')
        },
        {
            path: '/pacientes',
            name: 'Pacientes',
            meta: { guard: true },
            component: () => import('@/components/pacientes/List.vue')
        },
    ]
})

router.beforeEach((to, from, next) => { 
    if (to.meta.guard && !isAuthenticated()) next({ name: 'Login' })
    else next()
})

export default router

