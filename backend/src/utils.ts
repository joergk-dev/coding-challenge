import { Appointment } from './appointment'
import { AppointmentDB } from './database/appointmentDB'

import { TrainingDB } from './database/trainingDB'
import { Training } from './training'
import { TrainingAppointment } from './trainingAppointment'

export function convertTrainingDBToTraining(trainingDB: TrainingDB): Training {
  return new Training(
    trainingDB.getId(),
    trainingDB.getName(),
    trainingDB.getDescription(),
    trainingDB.getInstructorName(),
    trainingDB.getPrice()
  )
}

// export function convertAppointmentDBToAppointment(appointmentDB: AppointmentDB): Appointment {
//     return new Appointment(appointmentDB.getId(), appointmentDB.getTrainingId(), appointmentDB.getStartDate());
// }

export function convertTrainingDBAndAppointmentDBToTrainingAppointment(
  trainingDB: TrainingDB,
  appointmentDB: AppointmentDB
): TrainingAppointment {
  return new TrainingAppointment(
    appointmentDB.getId(),
    trainingDB.getId(),
    trainingDB.getName(),
    trainingDB.getDescription(),
    trainingDB.getInstructorName(),
    trainingDB.getPrice(),
    appointmentDB.getStartDate(),
    appointmentDB.getTrainingdays(),
    appointmentDB.getSignupCount(),
    appointmentDB.getMaxSignups()
  )
}

export function simpleDateCreate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): Date {
  return new Date(year, month - 1, day, hour, minute)
}

export function simpleDateToUnixTS(dates: Date): Number {
  return dates.valueOf()
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}
