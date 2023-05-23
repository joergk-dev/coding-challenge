import { test } from 'tap'
import buildServer from '../../../server'
import { DummyDB } from '../../../database/database'

test('requests the /trainingappointment route - fail without query params', async (t) => {
  const server = buildServer()

  t.teardown(() => {
    server.close()
  })

  const response = await server.inject({
    method: 'GET',
    url: '/trainingappointment'
  })

  t.equal(response.statusCode, 400)
})

test('requests the /trainingappointment route - fail without all query params only from', async (t) => {
  const server = buildServer()

  t.teardown(() => {
    server.close()
  })

  const response = await server.inject({
    method: 'GET',
    url: '/trainingappointment?from=1'
  })

  t.equal(response.statusCode, 400)
})

test('requests the /trainingappointment route - fail without all query params only to', async (t) => {
  const server = buildServer()

  t.teardown(() => {
    server.close()
  })

  const response = await server.inject({
    method: 'GET',
    url: '/trainingappointment?to=1'
  })

  t.equal(response.statusCode, 400)
})

test('requests the /trainingappointment route - fail with query params wront data type - from', async (t) => {
  const server = buildServer()

  t.teardown(() => {
    server.close()
  })

  const response = await server.inject({
    method: 'GET',
    url: '/trainingappointment?from=test&to=1'
  })

  t.equal(response.statusCode, 400)
})

test('requests the /trainingappointment route - fail with query params wront data type - to', async (t) => {
  const server = buildServer()

  t.teardown(() => {
    server.close()
  })

  const response = await server.inject({
    method: 'GET',
    url: '/trainingappointment?from=1&to=test'
  })

  t.equal(response.statusCode, 400)
})

test('requests the /trainingappointment route - succesfull query', async (t) => {
  const server = buildServer()

  t.teardown(() => {
    server.close()
  })

  const response = await server.inject({
    method: 'GET',
    url: `/trainingappointment?from=1&to=${new Date().valueOf().toString()}`
  })

  t.equal(response.statusCode, 200)
  let json = await response.json()
  t.ok(Array.isArray(json), 'Response is an Array')

  // check data
  const appointment = DummyDB.loadAllAppointments()[0]
  const jsonFirst = json[0]

  t.equal(jsonFirst.id, appointment.getId())
  t.equal(jsonFirst.trainingId, appointment.getTrainingId())
})
