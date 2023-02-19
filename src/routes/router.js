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
            component: () => import('@/pages/login/Login.vue')
        },
        {
            path: '/pacientes',
            name: 'pacientes',
            meta: { guard: false },
            component: () => import('@/pages/pacientes/List.vue'),
            children: [
                {
                    path: 'cadastro',
                    name: 'cadastro-pacientes',
                    meta: { guard: false },
                    component: () => import('@/pages/pacientes/PatientForm.vue')
                },
                {
                    path: ':id',
                    name: 'edita-pacientes',
                    meta: { guard: false },
                    component: () => import('@/pages/pacientes/PatientForm.vue')
                },
            ]
        }
    ]
})

router.beforeEach((to, from, next) => { 
    if (to.meta.guard && !isAuthenticated()) next({ name: 'Login' })
    else next()
})

export default router

