<script setup>
import { axiosInstance } from '@/api/axiosInstance'
import { ref, watchEffect } from 'vue'
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import Modal from '@/components/Modal.vue'
import { BButton } from 'bootstrap-vue-next'
import store from '../../../store'
import { useRouter } from 'vue-router'
import Comments from '../Comments/Comments.vue'
import CommentForm from '../Comments/CommentForm.vue'

const route = useRoute()
const blogId = route.params.blogId

const router = useRouter()

const blog = ref({})
const comments = ref()

const fetchBlog = async () => {
  try {
    const resp = await axiosInstance.get(`/blogs/${blogId}`)
    console.log(resp)
    blog.value = resp.data.data.blog
    comments.value = resp.data.data.comments
  } catch (error) {
    console.log(error)
    console.log(error.response.data.message)
  }
}

// const fetchComments = async () => {
//   try{
//     const resp = await axiosInstance.get(`/comments/${blogId}`)
//     console.log(resp)
//   }
// }

const handleEdit = async () => {
  try {
    const resp = await axiosInstance.patch(`/blogs/${blogId}`, {
      title: blog.value.title,
      content: blog.value.content,
    })
    store.commit(`toggleState`, { key: 'showLoginModal' })
    store.commit('changeToast', {
      show: true,
      title: 'Blog Edit Status',
      body: resp.data.message,
    })
  } catch (err) {
    console.log(err)
    store.commit(`toggleState`, { key: 'showLoginModal' })
    store.commit('changeToast', {
      show: true,
      title: 'Error edit',
      body: err.response.data.message,
    })
  }
}

const handleDelete = async () => {
  try {
    const resp = await axiosInstance.delete(`/blogs/${blogId}`)
    store.commit('toggleState', { key: 'showLoginModal' })
    store.commit('changeToast', {
      show: true,
      title: 'Deleted',
      body: resp.data.message,
    })
    router.push('/blogs')
  } catch (err) {
    console.log(err)
    store.commit('toggleState', { key: 'showLoginModal' })
    store.commit('changeToast', {
      show: true,
      title: 'Error Deleting',
      body: err.response.data.message,
    })
  }
}

onBeforeMount(() => {
  fetchBlog()
})

watchEffect(() => {
  const refresh = store.state.refresh //acts as dependency
  fetchBlog()
})
</script>

<template>
  <div class="container">
    <div class="d-flex">
      <div>
        <h1>{{ blog?.title }}</h1>
      </div>
      <div class="my-auto">
        <Modal
          title="Edit Blog"
          variant="outline-primary"
          iconHtml="<i class='fa-solid fa-pen-to-square'></i>"
          btnName=""
          stateName="showLoginModal"
        >
          <form method="post" id="update-blog">
            <div class="mb-2">
              <label for="title" class="form-label">Title</label>

              <input
                class="form-control"
                id="title"
                name="title"
                label="Title"
                v-model="blog.title"
                required
              />
            </div>

            <div class="mb-2">
              <label for="content" class="form-label">Title</label>

              <textarea
                id="content"
                name="content"
                label="Content"
                required
                v-model="blog.content"
                class="form-control"
                style="height: 300px"
              >
              </textarea>
            </div>
          </form>
          <hr />
          <div class="d-flex flex-row-reverse">
            <BButton variant="primary" class="mx-1" @click="handleEdit">
              <i class="fa-solid fa-floppy-disk"></i>
              Save
            </BButton>
            <BButton variant="danger" class="mx-1" @click="handleDelete">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </BButton>
            <BButton
              variant="secondary"
              class="mx-1"
              @click="
                store.commit(`toggleState`, {
                  key: `showLoginModal`,
                  value: false,
                })
              "
            >
              Cancel
            </BButton>
          </div>
        </Modal>
      </div>
    </div>

    <div>Published: {{ blog?.created_at }}</div>

    <div class="container">
      <div class="row">
        <div class="col-auto">
          <img
            :src="
              blog?.image?.startsWith('http')
                ? blog?.image
                : `http://localhost:8000/storage/images/${blog?.image}`
            "
            alt="blog-title"
            class="img-fluid"
            style="max-width: 200px"
          />
        </div>
        <div class="col">
          <p>{{ blog?.content }}</p>
        </div>
      </div>
    </div>

    <h2 class="text-decoration-underline bold my-3">Comments</h2>

    <CommentForm :blogId="blogId" />
    <!-- comment lists -->
    <Comments :comments="comments" />
  </div>
</template>
