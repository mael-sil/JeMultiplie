/**
 * interface for a multiplication between two numbers.
 *
 * @interface Operation
 * @member {number} a first number of the multiplication.
 * @member {number} b second number of the multiplication.
 * @member {number} result result of multiplying `a` by `b`.
 */
export interface Operation {
  a: number
  b: number
  result: number
}
