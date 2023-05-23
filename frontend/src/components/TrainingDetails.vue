<template>
  <div v-if="training">
    <h1>{{ training.name }}</h1>
    <p>{{ training.description }}</p>
    <p>Instructor: {{ training.instructorName }}</p>
    <p>Price: {{ training.price }}</p>

    <h2>Training Dates</h2>
    <ul>
      <li v-for="(day, index) in training.trainingDays" :key="index">
        {{ formatGermanDateTime(new Date(day)) }}
      </li>
    </ul>

    <button
      v-if="!openModal && training.signupCount < training.maxSignupCount"
      @click="openModal = true"
    >
      Sign Up
    </button>
    <div v-if="training.signupCount == training.maxSignupCount">Appointment sold out</div>

    <div v-if="openModal">
      <label>Name: <input v-model="name" required type="text" /></label>
      <label>Email: <input v-model="email" required type="email" /></label>
      <button @click="signUpForCourse">Submit</button>
      <button @click="openModal = false">Cancel</button>
    </div>

    <div v-if="responseMessage">
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import TrainingService from '../services/TrainingService'
import type { TrainingAppointment } from '@/components/types'
import { formatGermanDateTime } from '@/utils/util'

export default {
  setup() {
    const route = useRoute()
    const training: Ref<TrainingAppointment | undefined> = ref()
    const openModal = ref(false)
    const name = ref('')
    const email = ref('')
    const responseMessage = ref('')

    const getTrainingData = async () => {
      const data = await TrainingService.getTrainingAppointment(route.params.id as string)
      training.value = data
    }

    const signUpForCourse = async () => {
      try {
        await TrainingService.signUpForCourse(name.value, email.value, route.params.id as string)
        responseMessage.value = 'Successfully signed up!'
        openModal.value = false
      } catch (error) {
        responseMessage.value = (error as Error).message
      }
    }

    onMounted(getTrainingData)

    return {
      training,
      openModal,
      name,
      email,
      signUpForCourse,
      responseMessage,
      formatGermanDateTime
    }
  }
}
</script>
