<script setup>
import { axiosInstance } from '@/api/axiosInstance'
import store from '../../store'
import { reactive, ref } from 'vue'

store.commit('changeActiveTab', 'contact')

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})
const errors = reactive({})
const successMessage = ref('')

const validateForm = () => {
  errors.name = form.name ? '' : ['Name is required']
  errors.email = form.email ? '' : ['Email is required']
  errors.subject = form.subject ? '' : ['Subject is required']
  errors.message = form.message ? '' : ['Message is required']

  return !errors.name && !errors.email && !errors.subject && !errors.message
}

const submitForm = async () => {
  if (validateForm()) {
    try {
      const resp = await axiosInstance.post('/sendmail', form)
      console.log(resp)
      successMessage.value = resp.data.message
    } catch (error) {
      if (
        error.response.data.message == 'Validation error' ||
        error.status == 422
      ) {
        errors.name = error.response.data.errors.name
        errors.email = error.response.data.errors.email
        errors.subject = error.response.data.errors.subject
        errors.message = error.response.data.errors.message
        console.log('the error: ', errors)
      }
      console.log(error)
      console.log(error.message)
      console.log(error.response.data.message)
    }
    // Simulate form submission
    // Object.keys(form).forEach(key => (form[key] = ''))
  }
}
</script>

<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Contact Us</h2>
    <form @submit.prevent="submitForm" class="mx-auto" style="max-width: 600px">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          placeholder="Enter your name"
        />
        <div
          class="invalid-feedback"
          v-for="(err, index) of errors.name"
          :key="index"
        >
          {{ err }}
        </div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
          placeholder="Enter your email"
        />
        <div
          class="invalid-feedback"
          v-for="(err, index) of errors.email"
          :key="index"
        >
          {{ err }}
        </div>
      </div>

      <div class="mb-3">
        <label for="subject" class="form-label">Subject</label>
        <input
          type="text"
          id="subject"
          v-model="form.subject"
          class="form-control"
          :class="{ 'is-invalid': errors.subject }"
          placeholder="Enter the subject"
        />
        <div
          class="invalid-feedback"
          v-for="(err, index) of errors.subject"
          :key="index"
        >
          {{ err }}
        </div>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          class="form-control"
          :class="{ 'is-invalid': errors.message }"
          rows="4"
          placeholder="Enter your message"
        ></textarea>
        <div
          class="invalid-feedback"
          v-for="(err, index) of errors.message"
          :key="index"
        >
          {{ err }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary w-100">Submit</button>
    </form>

    <div v-if="successMessage" class="alert alert-success mt-3 text-center">
      {{ successMessage }}
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}
</style>
