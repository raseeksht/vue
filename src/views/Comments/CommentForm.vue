<script setup>
import { axiosInstance } from '@/api/axiosInstance'
import { BButton } from 'bootstrap-vue-next'
import { reactive, ref, watchEffect } from 'vue'
import store from '../../../store'

const props = defineProps({
  blogId: String,
  parent: Number,
})

const commentContent = ref('')
const errors = reactive({ validation: null })

watchEffect(() => {
  if (commentContent.value == '' || commentContent.value) {
    errors.validation = null
  }
})

const handlePostComment = async () => {
  try {
    const payload = {
      commentContent: commentContent.value,
      blog_id: props.blogId,
    }
    if (props.parent) {
      console.log(props.parent)
      payload.parent = Number(props.parent)
    }
    const resp = await axiosInstance.post(`/comments`, payload)
    console.log(resp)
    store.commit('changeToast', {
      show: true,
      title: 'Comment Added',
      body: resp.data.message,
    })
    store.commit('triggerRefresh')
  } catch (error) {
    console.log(error)
    if (error.response.data.message == 'Validation errors') {
      errors.validation = error.response.data.data
    }
    console.log(errors)
  }
}
</script>

<template>
  {{ store.state.refresh }}
  <form class="mb-3" @submit.prevent="handlePostComment">
    <div class="row">
      <div class="col col-10">
        <label for="commentContent">Make Your Comment</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors?.validation?.commentContent }"
          placeholder="good blog"
          v-model="commentContent"
        />
        <div
          id="contentHelp"
          class="form-text text-danger"
          v-for="(err, index) of errors?.validation?.commentContent"
          :key="index"
        >
          {{ err }}
        </div>
      </div>
      <div class="col mt-auto">
        <BButton type="submit" variant="outline-primary">Comment</BButton>
      </div>
    </div>

    <div class="threedot">three</div>
  </form>
</template>
