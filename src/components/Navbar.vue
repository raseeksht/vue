<script setup>
import { computed, onMounted } from 'vue'
import store from '../../store'
import Modal from './Modal.vue'
import LoginForm from './LoginForm.vue'
import { axiosInstance } from '@/api/axiosInstance'
import { useRouter } from 'vue-router'
import RegisterForm from './RegisterForm.vue'

const router = useRouter()

const currLocationComputed = computed({
  get() {
    return store.state.activeTab
  },
  set(newLoc) {
    store.commit('changeActiveTab', newLoc)
  },
})

const handleLogout = async () => {
  axiosInstance.get('/logout')
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  //remove user info  and token from localstorage
  store.commit('toggleState', { key: 'user', value: null })
  store.commit('toggleState', { key: 'token', value: null })
  router.push('/')
}

onMounted(() => {
  const curLoc = window.location.href.split('/')[3]
  store.commit('changeActiveTab', curLoc)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Blogger</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink
              :class="{
                'nav-link': true,
                active: store.state.activeTab == 'Home',
              }"
              aria-current="page"
              to="/"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              to="/about"
              :class="{
                'nav-link': true,
                active: store.state.activeTab == 'about',
              }"
              >AboutUs</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              :class="{
                'nav-link': true,
                active: store.state.activeTab == 'contact',
              }"
              to="/contact"
              @click="currLocationComputed = 'contact'"
              >ContactUs</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              :class="{
                'nav-link': true,
                active: store.state.activeTab == 'blogs',
              }"
              to="/blogs"
              >Blogs</RouterLink
            >
          </li>
        </ul>
        <div v-if="store.state.user">
          <div class="dropdown">
            <button
              class="btn btn-transparent border-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="`https://api.multiavatar.com/${store.state.user.name}.png`"
                class="img-fluid rounded-circle"
                style="height: 40px; widows: 40px"
              />
            </button>
            <ul class="dropdown-menu" style="--bs-dropdown-min-width: none">
              <li>
                <button class="btn dropdown-item" @click="handleLogout">
                  logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <Modal
            title="Login"
            btnName="Login"
            stateName="showLoginModal"
            variant="primary"
          >
            <LoginForm />
          </Modal>

          <Modal
            title="Register"
            btnName="Register"
            stateName="showRegisterModal"
            variant="secondary"
          >
            <RegisterForm />
          </Modal>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="css" scoped>
.active {
  border: 2px solid red;
}
</style>
