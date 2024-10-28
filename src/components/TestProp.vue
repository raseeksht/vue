<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import store from '../../store/index.js'

onMounted(() => {
  store.commit('changeActiveTab', 'Test')
})

store.commit('changeActiveTab', 'Home')

// watch(count, (newVal, oldval) => {
//   console.log(newVal, oldval)
// })

defineProps({
  title: {
    type: String,
    default: 'The default title is here',
  },
  subtitle: {
    type: String,
    default: 'subtitle',
  },
})

const colorCode = computed({
  get() {
    return store.state.color
  },
  set(newColor) {
    store.commit('changeColor', newColor)
  },
})
</script>
<template>
  <h1>{{ title }}</h1>
  <h2>{{ subtitle }}</h2>
  <span>{{ store.getters.square }}</span>
  <slot></slot>

  <h1 :style="{ color: store.state.color }">{{ store.state.count }}</h1>
  <button v-on:click="store.dispatch('decreaseCounter')">decrease</button>
  <button v-on:click="store.dispatch('increaseCounter')">increase</button>
  <div>
    <input class="form-control w-25" placeholder="color" v-model="colorCode" />
  </div>
</template>
