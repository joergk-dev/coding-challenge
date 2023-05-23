<template>
  <div>
    <h1>Create a New Training</h1>
    <form @submit="submitForm">
      <input v-model="form.name" type="text" placeholder="Name" required />
      <input v-model="form.description" type="text" placeholder="Description" required />
      <input v-model="form.instructorName" type="text" placeholder="Instructor Name" required />
      <input v-model="form.price" type="number" placeholder="Price" required />

      <button type="submit">Create Training</button>
    </form>
    <router-link v-if="trainingId" :to="`/add_appointment/${trainingId}`"
      >Add Appointments</router-link
    >
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import TrainingService from '../services/TrainingService'

export default {
  setup() {
    const form = ref({
      name: '',
      description: '',
      instructorName: '',
      price: 0
    })

    const trainingId = ref(null)

    const submitForm = async (event: Event) => {
      event.preventDefault()

      let training = await TrainingService.createTraining(
        form.value.name,
        form.value.description,
        form.value.instructorName,
        form.value.price
      )
      trainingId.value = training
    }

    return {
      form,
      submitForm,
      trainingId
    }
  }
}
</script>
