import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/DashBoard.vue'
import Cookies from 'js-cookie'
import ProblemsView from '../views/ProblemsView.vue'
import { useGeneralStore } from '../stores/generalStore'
import ListSubmissonsByDate from '../components/ListSubmissonsByDate.vue'


export function roleToken() {
  let role = '' // Sửa đổi: Khai báo biến role
  try {
    const token = Cookies.get('authToken')
    if (token) {
      role = decodeTokenAndGetUserRole(token)
    }
  } catch (error) {
    console.error('Lỗi:', error) // Sửa đổi: Sử dụng console.error('Lỗi:', error)
  }
  return role
}

function decodeTokenAndGetUserRole(token) {
  try {
    if (token) {
      const [, payloadBase64] = token.split('.')
      const decodedPayload = JSON.parse(atob(payloadBase64))

      // Đảm bảo rằng 'role' là một trường có trong payload trước khi truy cập
      if (decodedPayload && decodedPayload.role) {
        return decodedPayload.role
      } else {
        console.error('Trường "role" không tồn tại trong payload.')
        return null
      }
    } else {
      console.error('Token là null hoặc undefined.')
      return null
    }
  } catch (error) {
    console.error('Lỗi khi giải mã token:', error)
    return null
  }
}

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
      component: () => import('../components/RegisterForm.vue')
    },
    {
      path: '/problems',
      name: 'problem',
      component: ProblemsView,
      beforeEnter: (to, from, next) => {
        const token = Cookies.get('authToken')
        const generalStore = useGeneralStore()
        if (token) {
          next()
        } else {
          generalStore.showLoginDialog = true
          next(false) // Ngăn chặn điều hướng
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        const userRole = roleToken();
        if (userRole === 'ADMIN') {
          next() 
        } else {
          next('/') 
        }
      }
    },
    {
      path: '/user',
      name: 'UserManagement',
      component: () => import('../views/UserManagement.vue')
    },

    {
      path: '/addproblem',
      name: 'AddProblem',
      component: () => import('../views/CreateProblem.vue')
    },
    {
      path: '/problem-management',
      name: 'ProblemManagement',
      component: () => import('../views/ProblemManagement.vue')
    },
    {
      path: '/submits',
      name: 'SubmitManagement',
      component: ListSubmissonsByDate,
      beforeEnter: (to, from, next) => {
        const token = Cookies.get('authToken')
        const generalStore = useGeneralStore()
        if (token) {
          next()
        } else {
          generalStore.showLoginDialog = true
          next(false) // Ngăn chặn điều hướng
        }
      }
    }
  ]
})

export default router
