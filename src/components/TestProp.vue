<script setup>
import { computed, ref, watch } from 'vue'

const count = ref(0)

const increase = () => {
  count.value++
}

watch(count, (newVal, oldval) => {
  console.log(newVal, oldval)
})

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
</script>
<template>
  <h1>{{ title }}</h1>
  <h2>{{ subtitle }}</h2>
  <slot></slot>

  <h1>{{ count }}</h1>
  <button v-on:click="increase">increase</button>
</template>
