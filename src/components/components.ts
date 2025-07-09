import { createButton, createInput, createTitle } from './ui-elements.ts'
import { validateTypedText } from '../utils/helpers.ts'
import type { Goods } from '../models/models.ts'

export const renderHeader = () => {
  const wrapper = document.createElement('div')
  const title = createTitle('h2', 'Склад')
  const addButton = createButton('submit', 'add', 'Добавить запись')
  const searchInput = createInput('text', 'search', 'Поиск вещи по названию')

  wrapper.className = 'header__wrapper'
  searchInput.className = 'form__input'

  wrapper.append(title, searchInput, addButton)

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

export const renderTable = (): HTMLTableElement => {
  const table = document.createElement('table')
  table.className = 'table'

  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')

  const headers: Omit<Goods, 'id'> = {
    goodsName: 'Название',
    goodsRack: 'Полка',
    goodsWeight: 'Вес',
    storageTime: 'Время хранения'
  }

  Object.entries(headers).forEach(([key, label]) => {
    const th = document.createElement('th')
    th.id = key
    th.textContent = label
    th.className = 'table__head sortable'
    headerRow.appendChild(th)
  })

  const emptyTh = document.createElement('th')
  emptyTh.className = 'table__head'
  headerRow.appendChild(emptyTh)

  thead.appendChild(headerRow)
  const tbody = document.createElement('tbody')
  table.append(thead, tbody)

  return table
}
