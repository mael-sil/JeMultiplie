import type { Operation } from './operation'

export interface OperationResult {
  operation: Operation
  totalAttempts: number
  goodAnswers: number
  totalTime: number
  meanTime: number
}

export interface Result {
  date: Date
  operationsResult: OperationResult[]
  totalAttempts: number
  totalCorrects: number
  totalTime: number
  meanTime: number
  accuracy: number
}
