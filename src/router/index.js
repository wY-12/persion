import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/mainPage'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/three',
    name: 'three',
    component: () => import('../views/routerView/threeView.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/mainView.vue'),
    children:[
      {
        path: '/interview-questions',
        name: 'interview-questions',
        component: () => import('../views/routerView/collection/interviewQuestions.vue'),
        meta: {
          keepAlive: true //此组件需要被缓存
        }
      },
      {
        path: '/mainPage',
        name: 'mainPage',
        component: () => import('../views/routerView/mainPage.vue'),
        meta: {
          keepAlive: true //此组件需要被缓存
        }
      },
      {
        path: '/codeEditor',
        name: 'codeEditor',
        component: () => import('../views/routerView/collection/codeEditor.vue'),
        
      },
      {
        path: '/antic',
        name: 'antic',
        component: () => import('../views/routerView/collection/antic.vue')
      },
      {
        path: '/article-collection',
        name: 'article-collection',
        component: () => import('../views/routerView/collection/articleCollection.vue'),
        meta: {
          keepAlive: true //此组件需要被缓存
        }
      },
      {
        path: '/details',
        name: 'details',
        component: () => import('../views/routerView/collection/detailsView.vue')
      },
      {
        path: '/edit-details',
        name: 'edit-details',
        component: () => import('../views/routerView/collection/editDetails.vue')
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
