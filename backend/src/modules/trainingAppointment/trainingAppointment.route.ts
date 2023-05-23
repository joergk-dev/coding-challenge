import { FastifyInstance, FastifyRequest, FastifyReply, FastifySchema } from 'fastify'
import {
  createTrainingAppointmentHandler,
  createTrainingAppointmentSignupHandler,
  getTrainingAppointmentHandler,
  getTrainingAppointmenstHandler as getTrainingAppointmentsHandler
} from './trainingAppointment.controller'
import { $ref } from './trainingAppointment.schema'

async function trainingAppointmentRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        querystring: $ref('trainingAppointmentRequestSchema'),
        response: {
          200: $ref('trainingAppointmentsSchema')
        }
      }
    },
    getTrainingAppointmentsHandler
  )

  server.get(
    '/:id',
    {
      schema: {
        response: {
          200: $ref('trainingAppointmentSchema')
        }
      }
    },
    getTrainingAppointmentHandler
  )

  server.post(
    '/:id/signup',
    {
      schema: {
        body: $ref('trainingAppointmentSignupBodySchema'),
        response: {
          200: $ref('trainingAppointmentSignupResponseSchema'),
          400: $ref('trainingAppointmentSignupResponseSchema')
        }
      }
    },
    createTrainingAppointmentSignupHandler
  )

  server.post(
    '/:id',
    {
      schema: {
        body: $ref('trainingAppointmentCreateBodySchema'),
        response: {
          200: $ref('trainingAppointmentCreateResponseSchema'),
          400: $ref('trainingAppointmentCreateBodySchema')
        }
      }
    },
    createTrainingAppointmentHandler
  )
}

export default trainingAppointmentRoutes
