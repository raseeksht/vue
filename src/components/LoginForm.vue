<script setup>
import { axiosInstance } from '@/api/axiosInstance'
import { reactive, ref, watch } from 'vue'
import store from '../../store'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginData = reactive({})
const state = reactive({
  errMessage: {},
})

const handleLogin = async () => {
  try {
    const resp = await axiosInstance.post('/login', loginData)
    console.log(resp)
    if (resp.status == 200) {
      const token = resp.data.data.token
      if (token) {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(resp.data.data.user))
        store.state.user = resp.data.data.user
        router.push('/blogs')
      }
    }
  } catch (error) {
    if (error.status == 422) {
      state.errMessage.value = error.response.data.errors
    }
    console.log(error.response.data)
    store.commit('changeToast', {
      show: true,
      title: 'Login Error',
      body: error.response.data.message,
    })
  }
  store.commit('toggleState', { key: 'showLoginModal', value: false })
}
</script>

<template>
  <div>
    <form class="w-30" @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="text"
          name="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailhelp"
          v-model="loginData.email"
          required
        />
        <span class="text-danger">{{
          state.errMessage && state.errMessage.email
        }}</span>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          name="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="loginData.password"
          required
        />
        <span class="text-danger">{{
          state.errMessage && state.errMessage?.password
        }}</span>
      </div>
      <div>
        <div class="form-text">
          Don't have an account?
          <a href="/register" class="text-decoration-none mb-3">Register</a>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>
