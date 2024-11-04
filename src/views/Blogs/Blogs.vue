<script setup>
import { onMounted, ref, watch } from 'vue'
import store from '../../../store'
store.commit('changeActiveTab', 'blogs')

import { axiosInstance } from '@/api/axiosInstance'
import Card from '@/components/Card.vue'
import { BButton, BPagination } from 'bootstrap-vue-next'
import Modal from '@/components/Modal.vue'
import AddBlogForm from './AddBlogForm.vue'

const blogs = ref()
const currentPage = ref(1)

watch(currentPage, () => {
  fetchAllBlogs()
})

const fetchAllBlogs = async () => {
  try {
    const resp = await axiosInstance.get(`/blogs?page=${currentPage.value}`)
    blogs.value = resp.data.data
    currentPage.value = blogs.value.current_page
  } catch (err) {
    store.commit('changeToast', {
      show: true,
      title: 'Login Error',
      body: err.response.data.message,
    })
  }
  console.log(blogs)
}

onMounted(() => {
  fetchAllBlogs()
})
</script>
<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <div>
        <h1>All Blogs</h1>
      </div>
      <div class="my-auto">
        <Modal
          title="Add New Blog"
          variant="danger"
          stateName="showLoginModal"
          btn-name="Add Blog"
          icon-html="<i class='fa-solid fa-plus'></i>"
        >
          <AddBlogForm />
        </Modal>
      </div>
    </div>

    <div v-if="blogs" class="row row-cols-4 gap-2">
      <div v-for="(blog, index) of blogs.data" :key="index" class="row">
        <RouterLink :to="`/blogs/${blog.id}`" class="text-decoration-none">
          <Card class="" :blog="blog" />
        </RouterLink>
      </div>
    </div>
    <!-- pagination -->

    <div v-else>no blogs</div>

    <BPagination
      v-model="currentPage"
      :total-rows="blogs?.total"
      :per-page="blogs?.per_page"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
    />
  </div>

  <Modal variant="transparent" class="disabled" />
</template>
