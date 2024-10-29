import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import TestProp from '@/components/TestProp.vue'
import NotFound from '@/views/NotFound.vue'
import AboutUs from '@/views/AboutUs.vue'
import ContactUs from '@/views/ContactUs.vue'
import Blogs from '@/views/Blogs.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutUs,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactUs,
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: Blogs,
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
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
