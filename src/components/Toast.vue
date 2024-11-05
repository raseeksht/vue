<script setup>
import { BToast } from 'bootstrap-vue-next'
import store from '../../store'
import { watchEffect } from 'vue'

watchEffect(cleanUp => {
  const toast = store.state.toast.show
  const timeoutId = setTimeout(() => {
    store.commit('changeToast', {
      show: false,
    })
  }, 3000)

  cleanUp(() => {
    clearTimeout(timeoutId)
  })
})
</script>

<template>
  <BToast v-model="store.state.toast.show" variant="info" class="toast">
    <template #title> {{ store.state.toast.title }} </template>
    {{ store.state.toast.body }}
  </BToast>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 2px solid red;
}
</style>
