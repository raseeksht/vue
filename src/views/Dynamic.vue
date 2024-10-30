<script setup>
import { ref } from 'vue'
import Tab1 from '@/components/tabs/Tab1.vue'
import Tab2 from '@/components/tabs/Tab2.vue'
import Tab3 from '@/components/tabs/Tab3.vue'

const currentTab = ref(0)
const tabs = [
  { name: 'Tab1', component: Tab1 },
  { name: 'Tab2', component: Tab2 },
  { name: 'Tab3', component: Tab3 },
]
console.log(tabs)
</script>

<template>
  <div class="container">
    <h1 class="text-center">Dynamic component</h1>
    <ul class="nav nav-tabs">
      <div v-for="(tab, index) of tabs" :key="index">
        <li class="nav-item">
          <span
            class="nav-link"
            :class="{ active: currentTab == index }"
            aria-current="page"
            @click="currentTab = index"
            >{{ tab.name }}</span
          >
        </li>
      </div>
    </ul>
    <component :is="tabs[currentTab].component"></component>
  </div>
</template>
