import { createButton, createInput, createTitle } from './UI-elements.ts'
import { sortListByValue, validateTypedText } from '../utils/helpers.ts'
import type { Goods } from '../models/models.ts'

export const renderHeader = () => {
  const wrapper = document.createElement('div')
  const title = createTitle('h2', 'Склад')
  const addButton = createButton('submit', 'add', 'Добавить запись')

  wrapper.className = 'header__wrapper'

  wrapper.append(title, addButton)

  return wrapper
}

export const renderForm = () => {
  const form: HTMLFormElement = document.createElement('form')
  const title = createTitle('h2', 'Добавить запись')
  const goodsName = createInput('text', 'goods-name', 'Название', true)
  const rackName = createInput('text', 'rack', 'Полка', true)
  const goodsWeight = createInput('number', 'weight', 'Вес', true)
  const storageDate = createInput('date', 'storage-time', 'Время хранения', true)
  const submitButton = createButton('submit', 'add', 'Добавить запись')

  form.className = 'form'

  goodsName?.addEventListener('input', (e) => validateTypedText(e))
  rackName?.addEventListener('input', (e) => validateTypedText(e))

  form.append(title, goodsName, rackName, goodsWeight, storageDate, submitButton)

  return form
}

export const renderTableRow = (
  tableBody: HTMLTableSectionElement,
  goodsArray: Goods[],
  onDelete: (id: string) => void
) => {
  tableBody.replaceChildren()

  goodsArray.map((goods) => {
    const row = document.createElement('tr')

    const { goodsName, goodsRack, goodsWeight, storageTime } = goods
    const rowData = [goodsName, goodsRack, goodsWeight, storageTime]

    rowData.map((cellData) => {
      const td = document.createElement('td')
      td.textContent = String(cellData)
      row.appendChild(td)
    })

    const actionTd = document.createElement('td')
    const deleteBtn = createButton('button', 'delete', 'Удалить')

    deleteBtn.addEventListener('click', () => {
      onDelete(goods.id)
    })

    actionTd.appendChild(deleteBtn)
    row.appendChild(actionTd)

    tableBody.appendChild(row)
  })
}

export const renderTable = (
  getList: () => Goods[],
  setList: (newList: Goods[]) => void,
  getSortState: () => { key: keyof Goods | null; order: 'ascending' | 'descending' },
  setSortState: (newState: { key: keyof Goods | null; order: 'ascending' | 'descending' }) => void
) => {
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')
  const tbody = document.createElement('tbody')

  table.className = 'table'

  const headers: Omit<Goods, 'id'> = {
    goodsName: 'Название',
    goodsRack: 'Полка',
    goodsWeight: 'Вес',
    storageTime: 'Время хранения'
  }

  const handleSort = (key: keyof Goods) => {
    const currentSort = getSortState()

    const newOrder =
      currentSort.key === key && currentSort.order === 'ascending'
        ? 'descending'
        : 'ascending'

    setSortState({ key, order: newOrder })
    sortListByValue(getList(), key, newOrder, setList)
  }

  Object.entries(headers).forEach(([key, value]) => {
    const th = document.createElement('th')
    th.className = 'table__head'
    th.textContent = value
    th.id = key

    th.addEventListener('click', () => {
      handleSort(key as keyof Goods)
    })

    headerRow.appendChild(th)
  })

  const emptyTd = document.createElement('th')
  emptyTd.className = 'table__head'
  headerRow.appendChild(emptyTd)
  thead.appendChild(headerRow)
  table.append(thead, tbody)

  renderTableRow(tbody, getList(), (id) => {
    const updated = getList().filter(item => item.id !== id)
    setList(updated)
  })

  return table
}

