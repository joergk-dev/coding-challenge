import { Training } from '../training'
import { getRandomIntInclusive, simpleDateCreate } from '../utils'
import { AppointmentDB } from './appointmentDB'
import { TrainingDB } from './trainingDB'

class Database {
  private trainingDBData: TrainingDB[] = []
  private appointmentDBData: AppointmentDB[] = []

  private getLastTrainingId() {
    if (this.trainingDBData.length === 0) {
      return 0
    }
    return this.trainingDBData[this.trainingDBData.length - 1].getId()
  }

  private getLastAppointmentId() {
    if (this.appointmentDBData.length === 0) {
      return 0
    }
    return this.appointmentDBData[this.appointmentDBData.length - 1].getId()
  }

  public loadAllTrainings(): TrainingDB[] {
    return this.trainingDBData
  }

  public upateTraining(id: number, training: Training) {
    let data = this.trainingDBData.filter((training) => training.getId() === id)
    if (data && data.length === 1) {
      return data[0].update(training)
    }
    return
  }

  public loadAllAppointments(): AppointmentDB[] {
    return this.appointmentDBData
  }

  public createTraining(name: string, description: string, instructorName: string, price: number) {
    let training = new TrainingDB(
      this.getLastTrainingId() + 1,
      name,
      description,
      instructorName,
      price,
      new Date().valueOf()
    )
    this.trainingDBData.push(training)
    return training
  }

  public createAppointment(trainingID: number, trainingDays: number[]) {
    let appointment = new AppointmentDB(this.getLastAppointmentId() + 1, trainingID, trainingDays)
    this.appointmentDBData.push(appointment)
    return appointment
  }

  public createDummyData() {
    // Create dummy Trainings
    this.createTraining(
      'Learning Typescript',
      'Learning Typescript by creating multiple modern Backends with fastify',
      'John Doe',
      199.99
    )
    this.createTraining(
      'Learning Kotlin',
      'Learning Kotlin by creating one modern Backends with KTOR',
      'Johanna Doe',
      299.99
    )
    this.createTraining(
      'Learning Python',
      'Learning Python by creating multiple modern Backends with Django',
      'John Smith',
      399.99
    )

    // Create Dummy Appointments for each Training
    for (let month = 1; month < 13; month++) {
      for (let trainingIndex = 0; trainingIndex < this.trainingDBData.length; trainingIndex++) {
        const training = this.trainingDBData[trainingIndex]

        let countDays = getRandomIntInclusive(3, 2 * month)
        let startDate = simpleDateCreate(2023, month, month + trainingIndex, 15, 30)

        let trainingDays: number[] = []

        for (let trainingDayIndex = 0; trainingDayIndex < countDays; trainingDayIndex++) {
          let trainingDay = new Date()
          trainingDay.setDate(startDate.getDate() + trainingDayIndex * 7)
          trainingDays.push(trainingDay.valueOf())
        }
        this.createAppointment(training.getId(), trainingDays)
      }
    }
  }
}

export const DummyDB = new Database()
DummyDB.createDummyData()
