import type { Goods } from '../models/models.ts'
import { renderTableRow } from '../components/UI-elements.ts'

export const validateTypedText = (e: Event) => {
  const target = e.target as HTMLInputElement
  target.value = target.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9_.-]/g, '')
}

export const sortListByValue = (list: Goods[], _value: string, order: string) => {
  const sortedList = [...list]

  switch (_value) {
    case 'goodsName':
      sortedList.sort((a, b) => order === 'ascending'
        ? a.goodsName.localeCompare(b.goodsName)
        : b.goodsName.localeCompare(a.goodsName)
      )
      break
    case 'goodsRack':
      sortedList.sort((a, b) => order === 'ascending'
        ? +a.goodsRack - +b.goodsRack
        : +b.goodsRack - +a.goodsRack
      )
      break
    case 'goodsWeight':
      sortedList.sort((a, b) => order === 'ascending'
        ? +a.goodsWeight - +b.goodsWeight
        : +b.goodsWeight - +a.goodsWeight
      )
      break
    case 'storageTime':
      sortedList.sort((a, b) => {
        const dateA = new Date(a.storageTime)
        const dateB = new Date(b.storageTime)

        return order === 'ascending'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      })
      break
    default:
      sortedList.sort((a, b) => order === 'ascending'
        ? a.goodsName.localeCompare(b.goodsName)
        : b.goodsName.localeCompare(a.goodsName)
      )
  }

  const tableBody = document.querySelector('tbody')
  if (tableBody) renderTableRow(tableBody, sortedList)

  order = order === 'ascending' ? 'descending' : 'ascending'
}
