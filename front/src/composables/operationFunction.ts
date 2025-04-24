import type { Operation } from '@/models/operation'
import { getSave } from './save'
import type { Result } from '@/models/result'

const operationsTab: Operation[] = []

const weights: number[] = []
const totalTimePerOp: number[] = []
const nbrOp: number[] = []
const nbrOpTrue: number[] = []

let isGenerated = false

let nbrOpTotal = 0
let nbrOpTrueTotal = 0
let totalTime = 0

function generateOperation(min: number, max: number): void {
  for (let a = min; a <= max; a++) {
    for (let b = a; b <= max; b++) {
      operationsTab.push({ a, b, result: a * b })
      nbrOp.push(0)
      nbrOpTrue.push(0)
      totalTimePerOp.push(0)
      weights.push(20)
    }
  }

  console.log(weights)

  isGenerated = true
}

export function getOperation(min: number, max: number): Operation {
  if (isGenerated === false) {
    generateOperation(min, max)
  }

  let i

  const weightsTmp = [...weights]

  for (i = 1; i < weightsTmp.length; i++) {
    weightsTmp[i] += weightsTmp[i - 1]
  }

  let random = Math.random() * weightsTmp[weightsTmp.length - 1]

  for (i = 0; i < weights.length; i++) {
    if (weightsTmp[i] > random) {
      break
    }
  }

  return operationsTab[i]
}

export function saveResult(
  operation: Operation,
  isResultTrue: boolean,
  time: number,
): [number, number] {
  const indexOp = operationsTab.findIndex((op) => op.a === operation.a && op.b === operation.b)

  totalTimePerOp[indexOp] += time
  nbrOp[indexOp]++

  nbrOpTotal++
  totalTime += time

  if (isResultTrue) {
    nbrOpTrueTotal++

    nbrOpTrue[indexOp]++

    weights[indexOp] = totalTimePerOp[indexOp] / nbrOp[indexOp]
  } else {
    weights[indexOp] += 100
  }

  console.log(operationsTab)
  console.log(weights)

  return [totalTime / nbrOpTotal, (100 * nbrOpTrueTotal) / nbrOpTotal]
}

export function reset(): void {
  weights.fill(20)
  totalTimePerOp.fill(0)
  nbrOp.fill(0)
  nbrOpTrue.fill(0)

  nbrOpTotal = 0
  nbrOpTrueTotal = 0
  totalTime = 0
}

export function endSaveStorage() {
  if (nbrOpTotal > 0) {
    let resultHistory: Result[] = getSave()

    resultHistory.push({
      nbrOp: nbrOpTotal,
      nbrGoodAnswer: nbrOpTrueTotal,
      totalTime: totalTime,
      meanTime: totalTime / nbrOpTotal,
      accuracy: (100 * nbrOpTrueTotal) / nbrOpTotal,
    })

    localStorage.setItem('resultHistory', JSON.stringify(resultHistory))
  }
}
