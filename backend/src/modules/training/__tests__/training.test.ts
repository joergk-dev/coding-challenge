import { test } from 'tap'
import buildServer from '../../../server'
import { faker } from '@faker-js/faker'

test('requests the /training route', async (t) => {
  const server = buildServer()

  t.teardown(() => {
    server.close()
  })

  const response = await server.inject({
    method: 'GET',
    url: '/training'
  })

  t.equal(response.statusCode, 200)
})

test('post to the /training route - success', async (t) => {
  const server = buildServer()

  t.teardown(() => {
    server.close()
  })

  const name = faker.company.name()
  const description = faker.company.catchPhrase()
  const instructorName = faker.person.fullName()
  const price = Math.floor(Math.random() * 1_000)

  const response = await server.inject({
    method: 'POST',
    url: '/training',
    payload: {
      name,
      description,
      instructorName,
      price
    }
  })

  t.equal(response.statusCode, 200)
  const json = await response.json()

  t.equal(json.name, name)
  t.equal(json.description, description)
  t.equal(json.instructorName, instructorName)
  t.equal(json.price, price)
})
