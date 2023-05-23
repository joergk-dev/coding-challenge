import { DummyDB } from '../../database/database'
import { Training } from '../../training'
import { convertTrainingDBToTraining } from '../../utils'

export function loadAllTrainings() {
  return DummyDB.loadAllTrainings().map(convertTrainingDBToTraining)
}

export function loadTraining(id: number) {
  let data = DummyDB.loadAllTrainings()
    .filter((training) => training.getId() === id)
    .map(convertTrainingDBToTraining)
  if (data && data.length === 1) {
    return data[0]
  }
  return
}

export function updateTraining(id: number, data: Training) {
  return DummyDB.upateTraining(id, data)
}
