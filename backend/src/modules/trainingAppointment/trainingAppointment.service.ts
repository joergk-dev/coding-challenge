import { date } from 'zod'
import { DummyDB } from '../../database/database'
import { TrainingAppointment } from '../../trainingAppointment'
import { convertTrainingDBAndAppointmentDBToTrainingAppointment } from '../../utils'
import { AppointmentDB } from '../../database/appointmentDB'

export async function loadAllTrainingAppointments(from: number, to: number) {
  let a = DummyDB.loadAllAppointments()[0]
  const appointments = DummyDB.loadAllAppointments().filter(
    (appointment) =>
      appointment.getStartDate().valueOf() >= from && appointment.getStartDate().valueOf() <= to
  )
  const trainings = DummyDB.loadAllTrainings()
  let data: TrainingAppointment[] = []
  for (let index = 0; index < appointments.length; index++) {
    const appointment = appointments[index]
    let training = trainings.filter((training) => training.getId() === appointment.getTrainingId())
    if (training && training[0]) {
      data.push(convertTrainingDBAndAppointmentDBToTrainingAppointment(training[0], appointment))
    }
  }
  return data
}

export async function loadTrainingAppointment(id: number) {
  id = Number(id) // convert? or switch to string...
  let appointments = DummyDB.loadAllAppointments().filter(
    (appointment) => appointment.getId() === id
  )
  if (appointments && appointments.length === 1) {
    let appointment = appointments[0]
    const training = DummyDB.loadAllTrainings().filter(
      (training) => training.getId() === appointments[0].getTrainingId()
    )
    if (training && training.length === 1) {
      let data = convertTrainingDBAndAppointmentDBToTrainingAppointment(training[0], appointment)
      return data
    }
  }
}

export async function signupAppointment(id: number, name: string, email: string) {
  id = Number(id)
  let appointments = DummyDB.loadAllAppointments().filter(
    (appointment) => appointment.getId() === id
  )
  if (appointments && appointments.length === 1) {
    let appointment = appointments[0]
    if (appointment.getSignupCount() < appointment.getMaxSignups()) {
      appointment.addSignup(name, email)
      return true
    }
  }
  return false
}

export async function createAppointment(
  id: number,
  dates: number[]
): Promise<AppointmentDB | undefined> {
  id = Number(id)
  const training = DummyDB.loadAllTrainings().filter((training) => training.getId() === id)
  if (training && training.length === 1) {
    const data = DummyDB.createAppointment(training[0].getId(), dates)
    return data
  }

  return
}
