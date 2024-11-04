<script setup>
import { BButton } from 'bootstrap-vue-next'
import { computed, reactive, ref } from 'vue'
import store from '../../../store'
import { axiosInstance } from '@/api/axiosInstance'

const blogData = ref({
  title: '',
  content: '',
})
const errors = reactive({ validation: {} })

const isFormValid = computed(() => {
  errors.validation.title =
    blogData.value?.title?.length > 10 ? null : ['Title Must be 10 digit long']

  errors.validation.content =
    blogData.value?.content?.length > 40
      ? null
      : ['Content must be 40 char long']

  errors.validation.image = blogData.value?.image ? null : ['Image is required']

  return !errors?.validation?.title && !errors?.validation?.content
})

const handleBlogCreate = async () => {
  console.log(blogData.value)
  const formData = new FormData()
  formData.append('title', blogData.value.title)
  formData.append('content', blogData.value.content)
  formData.append('image', blogData.value.image)
  try {
    const resp = await axiosInstance.post('/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    store.commit('toggleState', { key: 'showLoginModal' })
    store.commit('changeToast', {
      show: true,
      title: 'New Blog Created',
      body: resp.data.message,
    })
  } catch (error) {
    console.log(error)
    console.log(error.response.data)
    if (error.response.data.message == 'Validation errors') {
      errors.validation = error.response.data.data
    }
  }
}

const handleFileUpload = e => {
  const file = e.target.files[0]
  console.log(file)
  blogData.value.image = file
}

// async function handleBlogCreate() {
//   alert('alert')
//   this.submit()
// }
</script>

<template>
  <form @submit.prevent="handleBlogCreate(e)">
    <div class="mb-2">
      <label for="title">Title</label>
      <input
        class="form-control"
        :class="{ 'is-invalid': errors?.validation?.title }"
        placeholder="awesome title"
        id="title"
        v-model="blogData.title"
        required
      />
      <div
        id="titleHelp"
        class="form-text text-danger"
        v-for="(err, index) of errors?.validation?.title"
        :key="index"
      >
        {{ err }}
      </div>
    </div>
    <div class="mb-2">
      <label for="title">Content</label>
      <textarea
        class="form-control"
        :class="{ 'is-invalid': errors?.validation?.content }"
        placeholder="awesome content"
        id="content"
        style="height: 300px"
        v-model="blogData.content"
        required
      />
      <div
        id="contentHelp"
        class="form-text text-danger"
        v-for="(err, index) of errors?.validation?.content"
        :key="index"
      >
        {{ err }}
      </div>
    </div>
    <div class="mb-2">
      <label for="image">Image</label>
      <input
        type="file"
        class="form-control"
        :class="{ 'is-invalid': errors?.validation?.image }"
        placeholder="awesome title"
        id="image"
        @change="handleFileUpload"
        accept="image/*"
        required
      />
      <div
        id="imageHelp"
        class="form-text text-danger"
        v-for="(err, index) of errors?.validation?.image"
        :key="index"
      >
        {{ err }}
      </div>
    </div>
    <hr />

    <div class="d-flex flex-row-reverse">
      <BButton
        variant="success"
        class="mx-1"
        type="submit"
        :disabled="!isFormValid"
      >
        Add
      </BButton>
      <BButton
        variant="secondary"
        class="mx-1"
        @click="store.commit('toggleState', { key: 'showLoginModal' })"
      >
        Cancel
      </BButton>
    </div>
  </form>
</template>
