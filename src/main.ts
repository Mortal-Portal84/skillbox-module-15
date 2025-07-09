import { renderForm, renderHeader, renderTable, renderTableRow } from './components/components.ts'
import type { Goods } from './models/models.ts'
import './style.css'
import { sortCompare } from './utils/helpers.ts'

// 📦 Исходный список товаров
let goodsList: Goods[] = [
  {
    id: '1',
    goodsName: 'Triumph',
    goodsRack: '14',
    goodsWeight: '20',
    storageTime: '2023-12-29'
  },
  {
    id: '2',
    goodsName: 'Oi! Oi! Oi!',
    goodsRack: '11',
    goodsWeight: '12',
    storageTime: '2025-07-07'
  },
  {
    id: '3',
    goodsName: 'Avesalom',
    goodsRack: '2',
    goodsWeight: '15',
    storageTime: '2022-07-18'
  },
  {
    id: '4',
    goodsName: 'Kui!',
    goodsRack: '15',
    goodsWeight: '18',
    storageTime: '2024-11-04'
  }
]

let filteredList: Goods[] = [...goodsList]

let sortState: { key: keyof Goods | null; order: 'ascending' | 'descending' } = {
  key: null,
  order: 'ascending'
}

const app = document.getElementById('app')!
const header = renderHeader()
const form = renderForm()
const table = renderTable()
const tbody = table.querySelector('tbody')!

app.append(header, table)

const rerenderRows = () => {
  const listToRender = [...filteredList]
  if (sortState.key) {
    listToRender.sort((a, b) => sortCompare(a, b, sortState.key!, sortState.order))
  }
  renderTableRow(tbody, listToRender, handleDelete)
}

const handleDelete = (id: string) => {
  goodsList = goodsList.filter(item => item.id !== id)
  filteredList = filteredList.filter(item => item.id !== id)
  rerenderRows()
}

const searchInput = header.querySelector('#search') as HTMLInputElement
searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase()
  filteredList = goodsList.filter(item =>
    item.goodsName.toLowerCase().includes(value)
  )
  rerenderRows()
})

const addButton = header.querySelector('.add')
addButton?.addEventListener('click', () => {
  app.replaceChildren(form)
})

const submitButton = form.querySelector('.add')
submitButton?.addEventListener('click', (e) => {
  e.preventDefault()
  if (!form.checkValidity()) return form.reportValidity()

  const goods: Goods = {
    id: crypto.randomUUID(),
    goodsName: (document.getElementById('goods-name') as HTMLInputElement).value,
    goodsRack: (document.getElementById('rack') as HTMLInputElement).value,
    goodsWeight: (document.getElementById('weight') as HTMLInputElement).value,
    storageTime: (document.getElementById('storage-time') as HTMLInputElement).value
  }

  goodsList.unshift(goods)
  filteredList = [...goodsList]
  form.reset()
  app.replaceChildren(header, table)
  rerenderRows()
})

const thElements = table.querySelectorAll('th.sortable')
thElements.forEach((th) => {
  th.addEventListener('click', () => {
    const key = th.id as keyof Goods
    const isSameKey = sortState.key === key
    const newOrder = isSameKey && sortState.order === 'ascending' ? 'descending' : 'ascending'
    sortState = { key, order: newOrder }
    rerenderRows()
  })
})

rerenderRows()
