import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const trainingAppointmentRequest = {
  from: z.number(),
  to: z.number()
}

const trainingAppointmentRequestSchema = z.object({
  ...trainingAppointmentRequest
})

export const trainingAppointmentSignupBodySchema = z.object({
  name: z.string(),
  email: z.string().email()
})

const trainingAppointmentSignupResponseSchema = z.object({
  message: z.string()
})

export const trainingAppointmentCreateBodySchema = z.object({
  dates: z.array(z.number())
})

export const trainingAppointmentCreateResponseSchema = z.object({
  id: z.number(),
  trainingId: z.number(),
  trainingDays: z.array(z.number())
})

const trainingAppointmentSchema = z.object({
  id: z.number(),
  trainingId: z.number(),
  name: z.string(),
  description: z.string(),
  instructorName: z.string(),
  price: z.number(),
  startDate: z.number(),
  trainingDays: z.array(z.number()),
  signupCount: z.number(),
  maxSignupCount: z.number()
})

const trainingAppointment = z.object({
  id: z.number(),
  trainingId: z.number(),
  name: z.string(),
  price: z.number(),
  startDate: z.number(),
  signupCount: z.number(),
  maxSignupCount: z.number()
})

const trainingAppointmentsSchema = z.array(trainingAppointment)

export const { schemas: trainingAppointmentSchemas, $ref } = buildJsonSchemas(
  {
    trainingAppointmentRequestSchema,
    trainingAppointmentSchema,
    trainingAppointmentsSchema,
    trainingAppointmentSignupBodySchema,
    trainingAppointmentSignupResponseSchema,
    trainingAppointmentCreateBodySchema,
    trainingAppointmentCreateResponseSchema
  },
  { $id: 'trainingAppointmentSchemas' }
)
