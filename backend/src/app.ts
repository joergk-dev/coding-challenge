import buildServer from './server'

const PORT = 3000
const server = buildServer()

const start = async () => {
  try {
    await server.listen({ port: PORT })
    console.log(`Server listening on port ${PORT}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
