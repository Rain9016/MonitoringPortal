import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register.vue')
    },
    {
      path: '/',
      redirect: 'portal'
    },
    {
      path: '/portal',
      name: 'Portal',
      component: () => import('@/views/portal.vue')
    }
  ]
})

// router guard
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = sessionStorage.getItem('userinfo') // get login data from vuex

  // redirect to login page if not logined
  if (authRequired && !loggedIn) {
    NProgress.done()
    return next('/login')
  }

  // redirect to home page if logined
  if (loggedIn && (to.path === '/login' || to.path === '/register')) {
    return next('/')
  }
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
