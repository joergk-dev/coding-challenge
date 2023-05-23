import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const training = {
  id: z.number(),
  name: z.string(),
  description: z.string(),
  instructorName: z.string(),
  price: z.number()
}

const trainingResponseSchema = z.object({
  ...training
})

const trainingsResponseSchema = z.array(trainingResponseSchema)

const trainingCreateBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  instructorName: z.string(),
  price: z.number()
})

const trainingUpdateBodySchema = trainingCreateBodySchema

export const { schemas: trainingSchemas, $ref } = buildJsonSchemas(
  {
    trainingResponseSchema,
    trainingsResponseSchema,
    trainingCreateBodySchema,
    trainingUpdateBodySchema
  },
  { $id: 'trainingSchemas' }
)
