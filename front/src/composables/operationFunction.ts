import type { Operation } from '@/models/operation'
import { getSave } from './save'
import type { OperationResult, Result } from '@/models/result'

const operationTab: Operation[] = []

const operationWeights: number[] = []

const operationResult: OperationResult[] = []

let isGenerated = false

let totalAttempts = 0
let totalCorrects = 0
let totalTime = 0

function generateOperation(min: number, max: number): void {
  for (let a = min; a <= max; a++) {
    for (let b = a; b <= max; b++) {
      const operation: Operation = { a, b, result: a * b }
      operationTab.push(operation)

      operationResult.push({
        operation: operation,
        totalAttempts: 0,
        goodAnswers: 0,
        totalTime: 0,
        meanTime: 0,
      })

      operationWeights.push(20)
    }
  }

  console.log(operationWeights)

  isGenerated = true
}

export function getOperation(min: number, max: number): Operation {
  if (isGenerated === false) {
    generateOperation(min, max)
  }

  let i

  const weightsTmp = [...operationWeights]

  for (i = 1; i < weightsTmp.length; i++) {
    weightsTmp[i] += weightsTmp[i - 1]
  }

  let random = Math.random() * weightsTmp[weightsTmp.length - 1]

  for (i = 0; i < operationWeights.length; i++) {
    if (weightsTmp[i] > random) {
      break
    }
  }

  return operationTab[i]
}

export function saveResult(
  operation: Operation,
  isResultTrue: boolean,
  time: number,
): [number, number] {
  const indexOp = operationTab.findIndex((op) => op.a === operation.a && op.b === operation.b)

  operationResult[indexOp].totalTime += time

  operationResult[indexOp].totalAttempts++

  totalAttempts++
  totalTime += time

  operationResult[indexOp].meanTime =
    operationResult[indexOp].totalTime / operationResult[indexOp].totalAttempts

  if (isResultTrue) {
    totalCorrects++

    operationResult[indexOp].goodAnswers++

    operationWeights[indexOp] = operationResult[indexOp].meanTime
  } else {
    operationWeights[indexOp] += 100
  }

  console.log(operationTab)
  console.log(operationWeights)

  return [totalTime / totalAttempts, (100 * totalCorrects) / totalAttempts]
}

export function reset(): void {
  operationWeights.fill(20)

  for (const result of operationResult) {
    result.totalTime = 0
    result.totalAttempts = 0
    result.goodAnswers = 0
    result.meanTime = 0
  }

  totalAttempts = 0
  totalCorrects = 0
  totalTime = 0
}

export function endSaveStorage() {
  if (totalAttempts > 0) {
    let resultHistory: Result[] = getSave()

    resultHistory.push({
      date: new Date(),
      totalAttempts: totalAttempts,
      operationsResult: operationResult,
      totalCorrects: totalCorrects,
      totalTime: totalTime,
      meanTime: totalTime / totalAttempts,
      accuracy: (100 * totalCorrects) / totalAttempts,
    })

    localStorage.setItem('resultHistory', JSON.stringify(resultHistory))
  }
}
