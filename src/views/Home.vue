<script setup>
import TestProp from '@/components/TestProp.vue'
import store from '../../store'

store.commit('changeActiveTab', 'Home')
</script>

<template>
  <h1>the home</h1>
  <div class="container">
    <h1 class="text-center">Vue jobs</h1>
    <TestProp title="custom tile" subtitle="testing">this is the slot</TestProp>
  </div>
  <!-- <a :href="'https://google.com'">test it</a>
    -->
  <router-link to="/test">chieck </router-link>
</template>
