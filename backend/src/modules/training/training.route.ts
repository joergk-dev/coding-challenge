import { FastifyInstance } from 'fastify'
import {
  createTrainingsHandler,
  getTrainingHandler,
  getTrainingsHandler,
  updateTrainingHandler
} from './training.controller'
import { $ref } from './training.schema'

async function trainingRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('trainingsResponseSchema')
        }
      }
    },
    getTrainingsHandler
  )

  server.get(
    '/:id',
    {
      schema: {
        response: {
          200: $ref('trainingResponseSchema')
        }
      }
    },
    getTrainingHandler
  )

  server.patch(
    '/:id',
    {
      schema: {
        body: $ref('trainingUpdateBodySchema'),
        response: {
          200: $ref('trainingResponseSchema')
        }
      }
    },
    updateTrainingHandler
  )

  server.post(
    '/',
    {
      schema: {
        body: $ref('trainingCreateBodySchema'),
        response: {
          200: $ref('trainingResponseSchema')
        }
      }
    },
    createTrainingsHandler
  )
}

export default trainingRoutes
