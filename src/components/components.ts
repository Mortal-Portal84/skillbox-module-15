import { createButton, createInput, createTitle } from './UI-elements.ts'
import { validateTypedText } from '../utils/helpers.ts'

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

export const renderTable = () => {
  const headers = ['Название', 'Полка', 'Вес', 'Время хранения', '']
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')
  const tbody = document.createElement('tbody')

  table.className = 'table'

  headers.map((text) => {
    const th = document.createElement('th')
    th.className = 'table__head'
    th.textContent = text

    headerRow.appendChild(th)
  })

  thead.appendChild(headerRow)
  table.append(thead, tbody)

  return table
}
