export class Training {
  private id: number
  private name: string
  private description: string
  private instructorName: string
  private price: number

  constructor(
    id: number,
    name: string,
    description: string,
    instructorName: string,
    price: number
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.instructorName = instructorName
    this.price = price
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
}
