<!-- <script setup>
import { onMounted, ref } from 'vue'

const name = ref('the viewer')
const status = ref(false)

const tasks = ref([])
const links = ref('https://google.com')

const newTask = ref({})

const addTask = () => {
  if (newTask.value.title.trim() !== '') {
    tasks.value.push({
      id: tasks.value.length + 1,
      userid: 1,
      title: newTask.value.title,
    })
    newTask.value.title = ''
  }
}

const toggleStatus = () => {
  // console.log(status.value)
  status.value = !status.value
}

const deleteTask = index => {
  // alert(index)
  tasks.value.splice(index, 1)
}

onMounted(async () => {
  try {
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await await resp.json()
    console.log(data)
    data.splice(20, 170)
    tasks.value = data
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status">Active</p>
  <p v-else>Inactive</p>
  <div>
    <h2>tasks</h2>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <span>
          {{ task.title }}
        </span>
        &nbsp;
        <button @click="deleteTask(index)">X</button>
      </li>
    </ul>

    <a :href="links"> take me to google</a>

    <button @click="toggleStatus">change status</button>

    <form @submit.prevent="addTask">
      <input type="text" id="newTask" name="newTask" v-model="newTask.title" />
      <button type="submit">Add the new Task</button>
    </form>
  </div>
</template>

<style scoped></style> -->

<script setup>
import Navbar from './components/Navbar.vue'

import { RouterView } from 'vue-router'
</script>

<template>
  <Navbar />
  <RouterView />
</template>
