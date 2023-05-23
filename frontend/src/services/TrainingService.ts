import type { Training } from '@/components/types'

const baseUrl = 'http://localhost:3000'

export default {
  async getTrainingsAppointments(fromDate: number, toDate: number) {
    let response = await fetch(`${baseUrl}/trainingappointment?from=${fromDate}&to=${toDate}`)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    let data = await response.json()
    return data
  },

  async getTraining(id: string) {
    let response = await fetch(`${baseUrl}/training/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  },

  async getTrainingAppointment(id: string) {
    const response = await fetch(`${baseUrl}/trainingappointment/${id}`)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  },

  signUpForCourse: async (name: string, email: string, id: string) => {
    const response = await fetch(`${baseUrl}/trainingappointment/${id}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })

    if (!response.ok) {
      const responseData = await response.json()
      if (responseData.message.includes('fully booked')) {
        throw new Error('Sorry, the course is fully booked.')
      } else {
        throw new Error('There was an error signing up for the course.')
      }
    }
    return await response.json()
  },

  createTraining: async (
    name: string,
    description: string,
    instructorName: string,
    price: number
  ) => {
    const response = await fetch(`${baseUrl}/training`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description, instructorName, price })
    })

    if (!response.ok) {
      const responseData = await response.json()
      throw new Error('There was an error creating training')
    }
    let data = await response.json()
    return data.id
  },

  updateTraining: async (training: Training) => {
    const response = await fetch(`${baseUrl}/training`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
    })

    if (!response.ok) {
      const responseData = await response.json()
      throw new Error('There was an error updating training')
    }
    let data = await response.json()
    return data.id
  },

  createAppointment: async (trainingId: string, dates: number[]) => {
    if (!isNaN(parseInt(trainingId))) {
      const id = parseInt(trainingId)
      const response = await fetch(`${baseUrl}/trainingappointment/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dates
        })
      })

      if (!response.ok) {
        const responseData = await response.json()
        throw new Error('There was an error creating training')
      }
      let data = await response.json()
      return data.id
    }
  }
}
