import { createButton, createInput, createTitle, renderTableRow } from './UI-elements.ts'
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

export const renderTable = (list: Goods[]) => {
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')
  const tbody = document.createElement('tbody')

  tbody.replaceChildren()
  table.className = 'table'

  const headers: Omit<Goods, 'id'> = {
    goodsName: 'Название',
    goodsRack: 'Полка',
    goodsWeight: 'Вес',
    storageTime: 'Время хранения'
  }

  Object.entries(headers).forEach(([key, value]) => {
    const th = document.createElement('th')
    th.className = 'table__head'
    th.textContent = value
    th.id = key
    th.dataset.order = 'ascending'

    th.addEventListener('click', () => {
      th.dataset.order = th.dataset.order === 'ascending' ? 'descending' : 'ascending'
      sortListByValue(list, key, th.dataset.order)
      console.log(key)
    })

    headerRow.appendChild(th)
  })

  const emptyTd = document.createElement('th')
  emptyTd.className = 'table__head'
  headerRow.appendChild(emptyTd)

  thead.appendChild(headerRow)
  table.append(thead, tbody)

  renderTableRow(tbody, list)

  return table
}
