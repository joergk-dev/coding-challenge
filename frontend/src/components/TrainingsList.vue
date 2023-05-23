<template>
  <div>
    <h1>Trainings Appointments</h1>
    <input v-model="fromDate" type="date" />
    <input v-model="toDate" type="date" />
    <button @click="fetchData">Fetch Data</button>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Start Date</th>
          <th>Price</th>
          <th>Slots Available</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in appointments" :key="appointment.id">
          <td>{{ appointment.name }}</td>
          <td>{{ formatGermanDateTime(new Date(appointment.startDate)) }}</td>
          <td>{{ appointment.price }}</td>
          <td>{{ appointment.signupCount < appointment.maxSignupCount ? 'Yes' : 'No' }}</td>
          <td>
            <router-link :to="{ name: 'Details', params: { id: appointment.id } }">
              View Details
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import TrainingService from '../services/TrainingService'
import type { Appointment } from '@/components/types'
import { formatGermanDateTime } from '../utils/util'

export default {
  setup() {
    const currentYear = new Date().getFullYear()
    const fromDate = ref(new Date(currentYear, 0, 1)) // first day of current year
    const toDate = ref(new Date(currentYear, 11, 31, 23, 59)) // last day of current year
    const appointments: Ref<Appointment[] | undefined> = ref()

    const fetchData = async () => {
      const fromDate_api = new Date(fromDate.value)
      const toDate_api = new Date(toDate.value)
      fromDate_api.setHours(0, 0, 0)
      toDate_api.setHours(23, 59, 0)
      const from = fromDate_api.valueOf()
      const to = toDate_api.valueOf()

      console.log(from, to)
      const data = await TrainingService.getTrainingsAppointments(from, to)
      appointments.value = data
    }

    onMounted(fetchData)

    return { fromDate, toDate, appointments, fetchData, formatGermanDateTime }
  }
}
</script>
