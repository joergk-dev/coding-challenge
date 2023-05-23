export class TrainingAppointment {
  private trainingId: number
  private id: number
  private name: string
  private description: string
  private instructorName: string
  private price: number
  private startDate: number
  private trainingDays: number[]
  private signupCount: number
  private maxSignupCount: number
  constructor(
    id: number,
    trainingId: number,
    name: string,
    description: string,
    instructorName: string,
    price: number,
    startDate: number,
    trainingDays: number[],
    signupCount: number,
    maxSignupCount: number
  ) {
    this.id = id
    this.trainingId = trainingId
    this.name = name
    this.description = description
    this.instructorName = instructorName
    this.price = price
    this.startDate = startDate
    this.trainingDays = trainingDays

    this.signupCount = signupCount
    this.maxSignupCount = maxSignupCount
  }

  public getId(): number {
    return this.id
  }

  public getTrainingId(): number {
    return this.trainingId
  }

  public getName(): string {
    return this.name
  }

  public getDescription(): string {
    return this.description
  }

  public getInstructorName(): string {
    return this.instructorName
  }

  public getPrice(): number {
    return this.price
  }

  public getTrainingDays(): number[] {
    return this.trainingDays
  }

  public getSignupCount(): number {
    return this.signupCount
  }

  public getMaxSignupCount(): number {
    return this.maxSignupCount
  }
}
