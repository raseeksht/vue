import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import TestProp from '@/components/TestProp.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/test',
    name: 'test',
    component: TestProp,
    props: {
      title: 'from router',
      subtitle: 'router subitlte',
    },
  },
  {
    path: '/:catchNotFound(.*)',
    name: 'notFound',
    component: TestProp,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
