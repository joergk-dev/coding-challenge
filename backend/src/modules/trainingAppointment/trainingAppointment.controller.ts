import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify'
import {
  createAppointment,
  loadAllTrainingAppointments,
  loadTrainingAppointment,
  signupAppointment
} from './trainingAppointment.service'
import { z } from 'zod'
import { trainingAppointmentSignupBodySchema } from './trainingAppointment.schema'

type trainingAppointmentsRequest = FastifyRequest<{
  Querystring: { from: number; to: number }
}>

type trainingAppointmentRequest = FastifyRequest<{
  Params: { id: number }
}>

type createTrainingAppointmentSignupRequest = FastifyRequest<{
  Params: { id: number }
  Body: z.infer<typeof trainingAppointmentSignupBodySchema>
}>

type createTrainingAppointmentRequest = FastifyRequest<{
  Params: { id: number }
  Body: {
    dates: number[]
  }
}>

export async function getTrainingAppointmenstHandler(
  request: trainingAppointmentsRequest,
  reply: FastifyReply
) {
  const { from, to } = request.query
  const data = await loadAllTrainingAppointments(from, to)
  return data
}

export async function getTrainingAppointmentHandler(
  request: trainingAppointmentRequest,
  reply: FastifyReply
) {
  const data = await loadTrainingAppointment(request.params.id)
  return data
}

export async function createTrainingAppointmentSignupHandler(
  request: createTrainingAppointmentSignupRequest,
  reply: FastifyReply
) {
  const { id } = request.params
  const { name, email } = request.body

  try {
    const success = await signupAppointment(id, name, email)

    if (success) {
      reply.code(200).send({ message: 'Signup was successful' })
    } else {
      reply.code(400).send({ message: 'Signup was unsuccessful, please try again' })
    }
  } catch (error) {
    reply.code(500).send({ message: 'An error occurred during signup, please try again' })
  }
}

export async function createTrainingAppointmentHandler(
  request: createTrainingAppointmentRequest,
  reply: FastifyReply
) {
  const { id } = request.params
  const { dates } = request.body
  const appointment = await createAppointment(id, dates)

  if (appointment) {
    return appointment
  } else {
    reply.code(400).send({ message: 'Appointment not created' })
  }
}
