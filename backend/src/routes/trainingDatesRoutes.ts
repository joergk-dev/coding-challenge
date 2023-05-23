import { FastifyInstance, FastifyRequest } from 'fastify'
import { DummyDB } from '../database/database'
import { TrainingAppointment } from '../trainingAppointment'
import {
  convertTrainingDBAndAppointmentDBToTrainingAppointment,
  simpleDateToUnixTS
} from '../utils'

type traininDatesRequest = FastifyRequest<{
  Params: { appointmentID: number }
}>

export default async function traininDatesRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get(
    '/trainingdatesdfsdfds/:appointmentID',
    async (request: traininDatesRequest, reply) => {
      const { appointmentID } = request.params
      if (appointmentID && !isNaN(Number(appointmentID))) {
        const appointments = DummyDB.loadAllAppointments().filter(
          (appointment) => appointment.getId() === Number(appointmentID)
        )
        if (appointments && appointments.length === 1) {
          return appointments[0].getTrainingdays()
        } else {
          return []
        }
      } else {
        return []
      }
    }
  )
}
