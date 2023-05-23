import { createRouter, createWebHistory } from 'vue-router'
import TrainingsList from '../components/TrainingsList.vue'
import TrainingDetails from '../components/TrainingDetails.vue'
import TrainingCreate from '@/components/TrainingCreate.vue'
import TraininAppointmentCreate from '@/components/TrainingAppointmentCreate.vue'
import TrainingUpdate from '@/components/TrainingUpdate.vue'

const routes = [
  { path: '/', name: 'Home', component: TrainingsList },
  { path: '/details/:id', name: 'Details', component: TrainingDetails },
  { path: '/create_training', name: 'CreateTraining', component: TrainingCreate },
  { path: '/update_training/:id', name: 'UpdateTraining', component: TrainingUpdate },
  { path: '/add_appointment/:id', name: 'CreateAppointment', component: TraininAppointmentCreate }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
