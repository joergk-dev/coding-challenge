<template>
  <div>
    <h1>Update Training</h1>
    <form @submit="submitForm" v-if="form">
      <input v-model="form.name" type="text" placeholder="Name" required />
      <input v-model="form.description" type="text" placeholder="Description" required />
      <input v-model="form.instructorName" type="text" placeholder="Instructor Name" required />
      <input v-model="form.price" type="number" placeholder="Price" required />
      <button type="submit">Update Training</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Training } from './types'
import TrainingService from '@/services/TrainingService'

export default {
  setup() {
    const form: Ref<Training | undefined> = ref()

    const route = useRoute()
    const router = useRouter()

    const submitForm = async (event: Event) => {
      event.preventDefault()

      const response = await fetch(`http://localhost:3000/training/${route.params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.value)
      })

      if (!response.ok) {
        throw new Error('Error while updating training')
      }

      router.push('/') // redirect to homepage after successful submission
    }

    const getTrainingData = async () => {
      const data = await TrainingService.getTraining(route.params.id as string)
      form.value = data
    }

    onMounted(getTrainingData)

    return {
      form,
      submitForm
    }
  }
}
</script>
