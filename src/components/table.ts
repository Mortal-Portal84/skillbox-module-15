import { createButton } from './ui-elements.ts'
import type { Goods } from '../models/models.ts'

export const renderEmptyState = (tbody: HTMLTableSectionElement, colCount: number) => {
  const emptyRow = document.createElement('tr')
  const emptyCell = document.createElement('td')
  emptyCell.className = 'table__empty-cell'

  emptyCell.textContent = 'Склад пуст'
  emptyCell.colSpan = colCount

  emptyRow.appendChild(emptyCell)
  tbody.appendChild(emptyRow)
}

export const renderTableRow = (
  tableBody: HTMLTableSectionElement,
  goodsArray: Goods[],
  onDelete: (id: string) => void,
  onEdit: (goods: Goods) => void
) => {
  tableBody.replaceChildren()

  if (goodsArray.length === 0) {
    const colCount = tableBody.closest('table')?.querySelectorAll('thead th').length || 1
    renderEmptyState(tableBody, colCount)
    return
  }

  goodsArray.forEach((goods) => {
    const row = document.createElement('tr')
    const { goodsName, goodsRack, goodsWeight, storageTime } = goods
    const rowData = [goodsName, goodsRack, goodsWeight, storageTime]

    rowData.forEach((cellData) => {
      const td = document.createElement('td')
      td.textContent = String(cellData)
      row.appendChild(td)
    })

    const actionTd = document.createElement('td')
    actionTd.className = 'table_actionTd'

    const editBtn = createButton('button', 'edit', 'Изменить')
    const deleteBtn = createButton('button', 'delete', 'Удалить')

    editBtn.addEventListener('click', () => onEdit(goods))
    deleteBtn.addEventListener('click', () => onDelete(goods.id))

    actionTd.append(editBtn, deleteBtn)
    row.appendChild(actionTd)

    tableBody.appendChild(row)
  })
}

const renderTable = (): HTMLTableElement => {
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

export default renderTable
