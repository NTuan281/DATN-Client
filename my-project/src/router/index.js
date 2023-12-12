import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/problems',
      name: 'problem',
      component: () => import('../views/ProblemsView.vue')
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component: ()=> import('../views/DashBoard.vue')
    },
    {
      path:'/user',
      name: 'UserManagement',
      component: ()=> import('../views/UserManagement.vue')
    },
    {
      path:'/problem',
      name:'ProblemManagement',
      component:()=> import ('../views/ProblemManagement.vue')
    }
  ]
})

export default router
