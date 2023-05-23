interface user {
  name: string
  email: string
}

export class AppointmentDB {
  private id: number
  private trainingId: number
  private trainingDays: number[]
  private createTS: Date = new Date()
  private signups: user[] = []
  private maxSignups: number = 10

  constructor(id: number, trainingId: number, trainingDays: number[]) {
    this.id = id
    this.trainingId = trainingId
    this.trainingDays = trainingDays
  }

  public getId(): number {
    return this.id
  }

  public getTrainingId(): number {
    return this.trainingId
  }

  public getStartDate(): number {
    if (this.trainingDays.length > 0) {
      return this.trainingDays[0]
    }
    return 0
  }

  public addTrainingday(date: Date) {
    this.trainingDays.push(date.valueOf())
  }

  public getTrainingdays(): number[] {
    return this.trainingDays
  }

  public getSignupCount() {
    return this.signups.length
  }

  public getMaxSignups() {
    return this.maxSignups
  }

  public addSignup(name: string, email: string) {
    const user = { name: name, email: email }
    this.signups.push(user)
  }
}
