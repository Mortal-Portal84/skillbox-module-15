import { createButton, createInput, createTitle } from './ui-elements.ts'

const renderHeader = () => {
  const wrapper = document.createElement('header')
  const title = createTitle('h2', 'Склад')
  const addButton = createButton('submit', 'add', 'Добавить запись')
  const searchInput = createInput('text', 'search', 'Поиск вещи по названию')

  wrapper.className = 'header__wrapper'
  searchInput.className = 'form__input'

  wrapper.append(title, searchInput, addButton)

  return wrapper
}

export default renderHeader
