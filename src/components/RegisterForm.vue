<script setup>
import { axiosInstance } from '@/api/axiosInstance'
import { reactive } from 'vue'
import store from '../../store'

const userData = reactive({})
const state = reactive({
  errMessage: {},
})

const handleRegister = async () => {
  try {
    state.errMessage = {} //reset err message
    const resp = await axiosInstance.post('/register', userData)
    console.log(resp)
    if (resp.status == 201) {
      localStorage.setItem('user', JSON.stringify(resp.data.data))
      localStorage.setItem('token', resp.data.data.token)
      store.commit('toggleState', { key: 'user', value: resp.data.data })
      store.commit('toggleState', { key: 'token', value: resp.data.data.token })

      store.commit('changeToast', {
        show: true,
        title: 'User Registration Status',
        body: resp.data.message,
      })
    }
  } catch (error) {
    if (error.response?.data?.message == 'Validation errors') {
      state.errMessage = error.response.data.data
      return
    }
    store.commit('changeToast', {
      show: true,
      title: 'Register Error',
      body: error.response.data.message,
    })
  }
  store.commit('toggleState', { key: 'showRegisterModal', value: false })
}
</script>

<template>
  <div>
    <form class="w-30" @submit.prevent="handleRegister">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          name="name"
          class="form-control"
          id="name"
          aria-describedby="namehelp"
          v-model="userData.name"
          required
        />
        <div v-for="(err, index) of state.errMessage?.name" :key="index">
          <span class="text-danger">
            {{ err }}
          </span>
        </div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="text"
          name="email"
          class="form-control"
          id="email"
          aria-describedby="emailhelp"
          v-model="userData.email"
          required
        />
        <div v-for="(err, index) of state.errMessage?.email" :key="index">
          <span class="text-danger">
            {{ err }}
          </span>
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          name="password"
          class="form-control"
          id="password"
          v-model="userData.password"
        />
        <div v-for="(err, index) of state.errMessage?.password" :key="index">
          <span class="text-danger">
            {{ err }}
          </span>
        </div>
      </div>
      <div>
        <div class="form-text">
          Already have an account?
          <a href="/register" class="text-decoration-none mb-3">Register</a>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>
