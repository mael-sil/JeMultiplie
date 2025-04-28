import type { Result } from '@/models/result'

/**
 * Function to get the result from localstorage if they exist
 */
export function getSave(): Result[] {
  const saved = localStorage.getItem('resultHistory')

  if (saved) {
    return JSON.parse(saved)
  } else {
    return []
  }
}
