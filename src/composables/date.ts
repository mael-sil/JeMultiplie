/**
 * Function to format a date into a string
 *
 * @param date - date we want to format
 *
 * @returns string "dd.mm yyyy hou:minute" corresponding to the date
 */
export function dateFormating(date: Date): string {
  const day: string = String(date.getDate())
  const month: string = String(date.getMonth())
  const dateString =
    day.padStart(2, '0') +
    '.' +
    month.padStart(2, '0') +
    ' ' +
    date.getFullYear() +
    ' ' +
    date.toTimeString().substring(0, 5)

  return dateString
}
