import type { Goods } from '../models/models.ts'

export const createTitle = (titleSize: 'h1' | 'h2', titleText: string) => {
  const title = document.createElement(titleSize)
  title.textContent = titleText

  return title
}

export const createInput = (
  type: string,
  inputID: string,
  placeholder: string | null = null,
  isRequired: boolean = false,
  isChecked: boolean = false
) => {
  const input = document.createElement('input')
  input.type = type
  input.id = inputID
  input.className = 'form__input'

  if (placeholder !== null) input.placeholder = placeholder
  if (isRequired) input.required = true
  if (isChecked) input.checked = true

  if (type === 'range') {
    input.min = '1'
    input.max = '10'
    input.step = '1'
    input.value = '5'
  }

  if (type === 'number') {
    input.min = '0'
    input.step = '0.01'
  }

  return input
}

export const createButton = (
  type: 'button' | 'submit' | 'reset' = 'button',
  className: string,
  text: string
): HTMLButtonElement => {
  const button = document.createElement('button')
  button.type = type
  button.className = className
  button.textContent = text

  return button
}

export const renderTableRow = (
  tableBody: HTMLTableSectionElement,
  goodsArray: Goods[]
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

    deleteBtn.dataset.goodsId = goods.id

    actionTd.appendChild(deleteBtn)
    row.appendChild(actionTd)

    tableBody.appendChild(row)
  })
}

