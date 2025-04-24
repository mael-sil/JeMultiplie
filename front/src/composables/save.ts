import type { Result } from '@/models/result'

export function getSave(): Result[] {
  const saved = localStorage.getItem('resultHistory')

  if (saved) {
    return JSON.parse(saved)
  } else {
    return []
  }
}


