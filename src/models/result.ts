import type { Operation } from './operation'

/**
 * interface for the result of a single multiplication.
 *
 * @interface OperationResult
 * @member {Operation} operation operation being tracked (e.g., a * b).
 * @member {number} totalAttempts total number of times this operation was attempted.
 * @member {number} goodAnswers number of correct answers for this operation.
 * @member {number} totalTime total time spent answering this operation (in seconds).
 * @member {number} meanTime average time spent per attempt for this operation.
 */
export interface OperationResult {
  operation: Operation
  totalAttempts: number
  goodAnswers: number
  totalTime: number
  meanTime: number
}

/**
 * interface for the overall result of a session
 *
 * @interface Result
 * @member {Date} date date and time when the session was ended.
 * @member {OperationResult[]} operationsResult An array of operation results for the session.
 * @member {number} totalAttempts total number of attempts.
 * @member {number} totalCorrects total number of correct answers.
 * @member {number} totalTime total time needed to answer (taking only the right answer).
 * @member {number} meanTime average time spent for operation (only on right answer).
 * @member {number} accuracy accuracy of the session (percentage of correct answers).
 */
export interface Result {
  date: Date
  operationsResult: OperationResult[]
  totalAttempts: number
  totalCorrects: number
  totalTime: number
  meanTime: number
  accuracy: number
}
