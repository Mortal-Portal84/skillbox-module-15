import { renderForm, renderHeader, renderTable } from './components/components.ts'
import { handleDelete, rerenderRows } from './utils/tableControllers.ts'

import { getGoodsList } from './api/mockData.ts'
import type { Goods } from './models/models.ts'

import './style.css'

let goodsList: Goods[] = getGoodsList()
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
const thElements = table.querySelectorAll('th.sortable')

app.append(header, table)

const rerender = () => {
  rerenderRows(filteredList, sortState, tbody, (id) =>
    handleDelete(
      id,
      () => goodsList,
      () => filteredList,
      (newList) => (goodsList = newList),
      (newList) => (filteredList = newList),
      rerender
    )
  )
}

thElements.forEach((th) => {
  th.addEventListener('click', () => {
    const key = th.id as keyof Goods
    const isSameKey = sortState.key === key
    const newOrder = isSameKey && sortState.order === 'ascending' ? 'descending' : 'ascending'

    sortState = { key, order: newOrder }
    rerender()
  })
})

const searchInput = header.querySelector('#search') as HTMLInputElement
searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase()
  filteredList = goodsList.filter(item =>
    item.goodsName.toLowerCase().includes(value)
  )

  rerender()
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

  rerender()
})

rerender()
