<script setup>
import { BAvatar } from 'bootstrap-vue-next'
import Comments from './Comments.vue'
import store from '../../../store'
import { axiosInstance } from '@/api/axiosInstance'
import Modal from '@/components/Modal.vue'

const props = defineProps({
  comments: Object,
})

const deleteComment = async (id, blog_id) => {
  //   alert(blog_id)
  //   return
  const payload = { blog_id }
  console.log(payload)
  try {
    const resp = await axiosInstance.delete(`/comments/${id}`, payload)
    console.log(resp)
    store.commit('changeToast', {
      show: true,
      title: 'Delete Comment Status',
      body: resp.data.message,
    })
    store.commit('triggerRefresh')
  } catch (err) {
    store.commit('changeToast', {
      show: true,
      title: 'Delete Comment Status',
      body: err.response.data.message,
    })
  }
}
</script>

<template>
  <div v-for="comment of comments" :key="comment" class="mb-2">
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <div class="image">
          <BAvatar
            variant="info"
            :src="`https://api.multiavatar.com/${comment.comment.user.name}.png`"
            size="3rem"
          />
        </div>
        <div class="px-2">
          <h5 class="mb-0">{{ comment.comment.user.name }}</h5>
          <p>{{ comment.comment.commentContent }}</p>
        </div>
      </div>

      <div class="dropdown">
        <button
          class="bg-transparent border-0"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 512"
            style="width: 20px; height: 20px"
            v-if="store.state.user.id == comment.comment.user.id"
          >
            <path
              d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
              style="fill: white; stroke: black; stroke-width: 2px"
            />
          </svg>
        </button>

        <ul class="dropdown-menu">
          <li
            class="px-2"
            style="cursor: pointer"
            @click="deleteComment(comment.comment.id, comment.comment.blog_id)"
          >
            Delete
          </li>
          <li class="px-2" style="cursor: pointer">Edit</li>
        </ul>
      </div>
    </div>

    <!-- replies -->
    <div v-if="comment.replies.length > 0" class="px-5">
      <Comments :comments="comment.replies" />
    </div>
  </div>
</template>
