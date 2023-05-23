<template>
  <div>
    <h1>Add Appointments</h1>
    <form @submit="submitForm">
      <div v-for="(date, index) in form.dates" :key="index">
        <input type="datetime-local" v-model="form.dates[index]" required />
      </div>
      <button type="button" @click="addDate">Add Date</button>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TrainingService from '../services/TrainingService'
import type { AppointmentCreateDates } from '@/components/types'

export default {
  setup() {
    const form: Ref<AppointmentCreateDates> = ref({ dates: [] })

    const route = useRoute()
    const router = useRouter()

    const addDate = () => {
      form.value.dates.push(new Date())
    }

    const submitForm = async (event: Event) => {
      event.preventDefault()

      // Convert dates to Unix time
      const dates = form.value.dates.map((date) => new Date(date).valueOf())
      TrainingService.createAppointment(route.params.id as string, dates)

      router.push('/') // redirect to homepage after successful submission
    }
    return {
      form,
      addDate,
      submitForm
    }
  }
}
</script>
