<script setup>
import { BButton, BModal } from 'bootstrap-vue-next'
import store from '../../store'
import { computed } from 'vue'

const props = defineProps({
  title: String,
  stateName: String,
  btnName: String,
  variant: String,
  footer: Boolean,
})

const showModal = computed({
  get() {
    return store.state[props.stateName]
  },
  set(naya) {
    // toggle any vuex
    store.commit(`toggleState`, {
      key: props.stateName,
      value: naya,
    })
  },
})
</script>

<template>
  <BButton
    @click="showModal = !showModal"
    :variant="variant || 'primary'"
    class="mx-1"
  >
    {{ btnName }}
  </BButton>
  <BModal v-model="showModal" :title="title" :hide-footer="true">
    <slot></slot>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </BModal>
</template>
