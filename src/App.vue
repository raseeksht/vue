<script setup>
import Navbar from './components/Navbar.vue'

import { RouterView } from 'vue-router'
import Toast from './components/Toast.vue'
</script>

<template>
  <Navbar />

  <RouterView />

  <Toast />
</template>
