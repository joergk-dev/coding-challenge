export interface Appointment {
  id: number
  name: string
  description: string
  startDate: number
  price: number
  signupCount: number
  maxSignupCount: number
}

export interface Training {
  id: number
  name: string
  description: string
  instructorName: string
  price: number
}

export interface TrainingAppointment extends Training {
  trainingDays: number[]
  signupCount: number
  maxSignupCount: number
}

export interface AppointmentCreateDates {
  dates: Date[]
}
