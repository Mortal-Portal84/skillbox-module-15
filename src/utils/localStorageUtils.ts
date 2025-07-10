import type { Goods } from '../models/models.ts'

const STORAGE_KEY = 'goods'

export const getGoodsFromStorage = (): Goods[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Ошибка чтения localStorage:', e)
    return []
  }
}

export const saveGoodsToStorage = (goodsList: Goods[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goodsList))
  } catch (e) {
    console.error('Ошибка записи в localStorage:', e)
  }
}
