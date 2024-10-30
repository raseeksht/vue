<script setup>
import { BButton, BCard, BCardText } from 'bootstrap-vue-next'

const props = defineProps({
  blog: Object,
})

console.log(props.blog)
</script>

<template>
  <BCard
    :title="blog.title"
    :img-src="
      blog?.image?.startsWith('http')
        ? blog.image
        : `http://localhost:8000/uploads/a.png`
    "
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem"
  >
    <BCardText>
      {{ blog.content.slice(1, 100) }} ...
      <h5>{{ blog.user.name }}</h5>
    </BCardText>
  </BCard>
</template>
