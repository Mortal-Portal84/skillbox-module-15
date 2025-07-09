import type { Goods } from '../models/models.ts'

export const validateTypedText = (e: Event) => {
  const target = e.target as HTMLInputElement
  target.value = target.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9_.-]/g, '')
}

export const sortListByValue = (
  list: Goods[],
  key: keyof Goods,
  order: 'ascending' | 'descending',
  setList: (newList: Goods[]) => void
) => {
  const sorted = [...list]

  switch (key) {
    case 'goodsName':
      sorted.sort((a, b) =>
        order === 'ascending'
          ? a.goodsName.localeCompare(b.goodsName)
          : b.goodsName.localeCompare(a.goodsName)
      )
      break
    case 'goodsRack':
      sorted.sort((a, b) =>
        order === 'ascending'
          ? +a.goodsRack - +b.goodsRack
          : +b.goodsRack - +a.goodsRack
      )
      break
    case 'goodsWeight':
      sorted.sort((a, b) =>
        order === 'ascending'
          ? +a.goodsWeight - +b.goodsWeight
          : +b.goodsWeight - +a.goodsWeight
      )
      break
    case 'storageTime':
      sorted.sort((a, b) => {
        const dateA = new Date(a.storageTime)
        const dateB = new Date(b.storageTime)
        return order === 'ascending'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      })
      break
  }

  setList(sorted)
}
