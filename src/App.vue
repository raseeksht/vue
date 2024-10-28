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
import { computed, reactive, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import store from '../store'

import { RouterView } from 'vue-router'
import Modal from './components/Modal.vue'

const name = ref('ram')
const myString = ref('')
const myNumber = ref(1)
const isVisible = ref(true)
const eventName = ref('click')
const formData = reactive({})

const computedDetails = computed(() => {
  return formData.name
    ? `Username: ${formData.name} Email: ${formData.email} Password: ${formData.password} Age: ${formData.age} Years Old`
    : 'fillup the form first'
})

const triggerAlert = (msg = '') => {
  alert('triggered: ' + msg)
}

const handleForm = () => {
  console.log('handling form')
  console.log(formData)
  console.log(formData.name)
}

const handleEmittedData = data => {
  alert(data)
}
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

    <hr />
    <fieldset class="border p-3 rounded">
      <legend class="float-none w-auto px-2 text-light">
        V-ON: shorthand: @
      </legend>

      <button v-on:click="triggerAlert">Trigger alert on click</button>

      <button v-on:click="store.dispatch('increaseCounter')">
        Increase Count
      </button>
      <button v-on:click="store.dispatch('decreaseCounter')">
        Decrease Count
      </button>

      <fieldset class="border p-3 rounded">
        <legend class="float-none w-auto px-2 text-light">dynamic event</legend>
        <select v-model="eventName">
          <option value="click">click</option>
          <option value="mouseenter">mouseenter</option>
          <option value="mousedown">mousedown</option>
          <option value="mouseleave">mouseleave</option>
        </select>

        <div class="p-3 m-2 bg-warning-subtle" @[eventName]="triggerAlert">
          trigger alert based on dynamic eventName
        </div>
      </fieldset>

      <fieldset class="border">
        <legend class="float-none w-auto px-2 text-light">
          Event modifier
        </legend>

        <form @submit.prevent="handleForm" class="p-3">
          <div class="row row-cols-2">
            <div class="mb-3 col">
              <label for="name" class="form-label">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                v-model="formData.name"
              />
            </div>

            <div class="mb-3 col">
              <label for="email" class="form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-control"
                v-model="formData.email"
              />
            </div>

            <div class="mb-3 col">
              <label for="age" class="form-label">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                class="form-control"
                v-model="formData.age"
              />
            </div>

            <div class="mb-3 col">
              <label for="password" class="form-label">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                class="form-control"
                v-model="formData.password"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Submit</button>
        </form>
      </fieldset>

      <fieldset class="border my-3 rounded">
        <legend class="float-none w-auto px-2 text-light">
          Stopping event propagation
        </legend>
        Without stopping event propagation
        <div class="p-2 m-2 bg-body-tertiary" @click="triggerAlert(`outer`)">
          Outer div
          <div class="p-3 bg-primary" @click="triggerAlert(`inner`)">
            Inner div
          </div>
        </div>

        event propagation stoppped(.stop)
        <div class="p-2 m-2 bg-body-tertiary" @click="triggerAlert(`outer`)">
          Outer div
          <div class="p-3 bg-primary" @click.stop="triggerAlert(`inner`)">
            Inner div
          </div>
        </div>
      </fieldset>

      <fieldset class="border my-3 rounded">
        <legend class="float-none w-auto px-2 text-light">
          Computed UserDetails
        </legend>
        <div>
          {{ computedDetails }}
        </div>
      </fieldset>
    </fieldset>

    <fieldset class="border rounded p-2 my-3">
      <legend class="float-none w-auto text-light">Components and props</legend>

      <Modal
        title="title through prop"
        body="body through prop"
        @someVar="handleEmittedData"
      />
    </fieldset>
  </div>
</template>
