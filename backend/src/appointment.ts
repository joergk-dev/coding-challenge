export class Appointment {
  private id: number
  private trainingId: number
  private startDate: Date

  constructor(id: number, trainingId: number, startDate: Date) {
    this.id = id
    this.trainingId = trainingId
    this.startDate = startDate
  }

  public getId(): number {
    return this.id
  }

  public getTrainingId(): number {
    return this.trainingId
  }

  public getStartDate(): Date {
    return this.startDate
  }
}
