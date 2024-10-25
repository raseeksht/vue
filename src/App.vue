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
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'

import { RouterView } from 'vue-router'

const name = ref('ram')
const myString = ref('')
const myNumber = ref(1)
const isVisible = ref(true)
</script>

<template>
  <Navbar />

  <RouterView />
  <hr />
  <div class="container">
    <img
      v-bind:src="`https://api.multiavatar.com/${name}.png`"
      :alt="name"
      height="100"
      width="100"
    />

    <br />
    <div>
      <input
        type="text"
        class="form-control my-3"
        placeholder="some text here"
        v-model="name"
      />
    </div>

    <button
      :class="{ 'btn btn-primary': name == 'ram' }"
      @click="name = 'shyam' + Math.floor(Math.random() * 10000)"
    >
      Random
    </button>

    <hr />
    <div>
      <h3>v-model.lazy ( listen to change events instead of input)</h3>
      myString:
      <pre>{{ myString }}</pre>
      <br />
      <input type="text" v-model.lazy.trim="myString" />
    </div>

    <div>
      <h3>v-model.number ( listen to change events instead of input)</h3>
      myString: {{ myNumber }} type: {{ typeof myNumber }}<br />
      <input type="text" v-model.number="myNumber" />
    </div>

    <div>
      <h1>
        <span v-show="isVisible">v show</span>

        <button class="btn btn-primary" @click="isVisible = !isVisible">
          toggle v-show
        </button>
      </h1>
    </div>
  </div>
</template>
