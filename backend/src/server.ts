import fastify, { FastifyInstance } from 'fastify'
import traininDatesRoutes from './routes/trainingDatesRoutes'
import cors from '@fastify/cors'
import trainingRoutes from './modules/training/training.route'
import { trainingSchemas } from './modules/training/training.schema'
import { trainingAppointmentSchemas } from './modules/trainingAppointment/trainingAppointment.schema'
import trainingAppointmentRoutes from './modules/trainingAppointment/trainingAppointment.route'

function buildServer() {
  const server: FastifyInstance = fastify()

  server.get('/healthcheck', async function () {
    return { status: 'OK' }
  })

  for (const schema of [...trainingSchemas, ...trainingAppointmentSchemas]) {
    server.addSchema(schema)
  }

  server.register(cors, {})
  server.register(trainingRoutes, { prefix: '/training' })
  server.register(trainingAppointmentRoutes, { prefix: '/trainingappointment' })
  server.register(traininDatesRoutes)
  return server
}

export default buildServer
