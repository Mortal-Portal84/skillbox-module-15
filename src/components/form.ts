import { createButton, createInput, createTitle } from './ui-elements.ts'
import { validateTypedText } from '../utils/helpers.ts'
import type { Goods } from '../models/models.ts'

const renderForm = (goods: Goods | null) => {
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

  if (goods) {
    title.textContent = 'Изменить вещь'
    goodsName.value = goods.goodsName
    rackName.value = goods.goodsRack
    goodsWeight.value = goods.goodsWeight
    storageDate.value = goods.storageTime
    submitButton.textContent = 'Применить изменения'
  }

  form.append(title, goodsName, rackName, goodsWeight, storageDate, submitButton)

  return form
}

export default renderForm
