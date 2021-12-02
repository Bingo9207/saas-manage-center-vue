import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    component: () => import("../views/Layout.vue"),
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        name: '工作台',
        component: () => import('../views/Welcome.vue')
      },
      {
        path: '/nav',
        name: '导航页',
        component: () => import('../views/Nav.vue')
      },
      {
        path: '/:name1/:name2/:name3',
        name: '动态',
        component: () => import('../views/BlankLayout.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/saasTenant/'),
  routes
})

export default router