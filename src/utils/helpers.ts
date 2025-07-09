import type { Goods } from '../models/models.ts'

export const validateTypedText = (e: Event) => {
  const target = e.target as HTMLInputElement
  target.value = target.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9_.-]/g, '')
}

export const sortCompare = (
  a: Goods,
  b: Goods,
  key: keyof Goods,
  order: 'ascending' | 'descending'
): number => {
  const dir = order === 'ascending' ? 1 : -1

  if (key === 'storageTime') {
    return (new Date(a[key]).getTime() - new Date(b[key]).getTime()) * dir
  }

  const valA = a[key]
  const valB = b[key]

  return valA.localeCompare(valB) * dir
}
