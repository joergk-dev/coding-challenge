import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify'
import { loadAllTrainings, loadTraining, updateTraining } from './training.service'
import { Training } from '../../training'
import { DummyDB } from '../../database/database'

// Declare types for Request
type createTrainingHandlerRequest = FastifyRequest<{
  Body: {
    name: string
    description: string
    instructorName: string
    price: number
  }
}>

type trainingRequest = FastifyRequest<{
  Params: { id: number }
}>

type updateTrainingRequest = FastifyRequest<{
  Params: { id: number }
  Body: {
    name: string
    description: string
    instructorName: string
    price: number
  }
}>

export async function getTrainingsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = loadAllTrainings()
    return data
  } catch (e) {
    console.error(e)
    return reply.code(500).send(e)
  }
}

export async function getTrainingHandler(request: trainingRequest, reply: FastifyReply) {
  const id = Number(request.params.id)
  const data = loadTraining(id)
  if (data) {
    return data
  }
  return reply.code(500).send('Training not found')
}

export async function updateTrainingHandler(request: updateTrainingRequest, reply: FastifyReply) {
  const id = Number(request.params.id)
  let training = new Training(
    id,
    request.body.name,
    request.body.description,
    request.body.instructorName,
    request.body.price
  )
  const data = updateTraining(id, training)
  if (data) {
    return data
  }
  return reply.code(500).send('Training not found')
}

export async function createTrainingsHandler(
  request: createTrainingHandlerRequest,
  reply: FastifyReply
) {
  try {
    let training = DummyDB.createTraining(
      request.body.name,
      request.body.description,
      request.body.instructorName,
      request.body.price
    )
    return training
  } catch (e) {
    console.error(e)
    return reply.code(500).send(e)
  }
}
