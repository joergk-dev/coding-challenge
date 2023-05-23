import { Training } from '../training'

export class TrainingDB {
  private id: number
  private name: string
  private description: string
  private instructorName: string
  private price: number
  private createTS: number

  constructor(
    id: number,
    name: string,
    description: string,
    instructorName: string,
    price: number,
    createTS: number
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.instructorName = instructorName
    this.price = price
    this.createTS = createTS
  }

  public getId(): number {
    return this.id
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

  public getCreateTS(): number {
    return this.createTS
  }

  public update(training: Training) {
    this.name = training.getName()
    this.description = training.getDescription()
    this.instructorName = training.getInstructorName()
    this.price = training.getPrice()
    return this
  }
}
