<script setup>
import { BToast } from 'bootstrap-vue-next'
import store from '../../store'
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
