import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import TestProp from '@/components/TestProp.vue'
import NotFound from '@/views/NotFound.vue'
import AboutUs from '@/views/AboutUs.vue'
import ContactUs from '@/views/ContactUs.vue'
import Blogs from '@/views/Blogs/Blogs.vue'
import Dynamic from '@/views/Dynamic.vue'
import BlogsLayout from '@/views/Blogs/BlogsLayout.vue'
import SingleBlog from '@/views/Blogs/SingleBlog.vue'
import store from '../../store'

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
    component: BlogsLayout,
    children: [
      {
        path: '',
        component: Blogs,
        name: 'allblogs',
      },
      {
        path: ':blogId',
        component: SingleBlog,
        name: 'SingleBlog',
      },
    ],
    meta: { requireAuth: true },
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: Dynamic,
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

router.beforeEach((to, from) => {
  if (to.meta.requireAuth && !store.state.user) {
    store.commit('toggleState', { key: 'showLoginModal' })
    return {
      path: from.fullPath,
    }
  }
})

export default router
