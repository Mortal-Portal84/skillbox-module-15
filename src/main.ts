import renderHeader from './components/header.ts'
import renderForm from './components/form.ts'
import renderTable from './components/table.ts'

import { handleDelete, handleEdit, rerenderRows } from './utils/tableControllers.ts'

import getGoodsList from './api/mockData.ts'
import type { Goods } from './models/models.ts'

import './style.css'

let goodsList: Goods[] = getGoodsList()
let filteredList: Goods[] = [...goodsList]
let selectedGoods: Goods | null = null
let sortState: { key: keyof Goods | null; order: 'ascending' | 'descending' } = {
  key: null,
  order: 'ascending'
}

const app = document.getElementById('app')!
const header = renderHeader()
const table = renderTable()
const tbody = table.querySelector('tbody')!
const thElements = table.querySelectorAll('th.sortable')

const rerender = () => {
  rerenderRows(
    filteredList,
    sortState,
    tbody,
    (id: string) =>
      handleDelete(
        id,
        () => goodsList,
        () => filteredList,
        (list) => (goodsList = list),
        (list) => (filteredList = list),
        rerender
      ),
    (goods: Goods) =>
      handleEdit(
        goods,
        () => goodsList,
        () => filteredList,
        (list) => (goodsList = list),
        (list) => (filteredList = list),
        () => selectedGoods,
        (value) => { selectedGoods = value },
        renderForm,
        app,
        rerender,
        header,
        table
      )
  )
}

app.append(header, table)
rerender()

const searchInput = header.querySelector('#search') as HTMLInputElement
searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase()
  filteredList = goodsList.filter((item) =>
    item.goodsName.toLowerCase().includes(value)
  )
  rerender()
})

const addButton = header.querySelector('.add')
addButton?.addEventListener('click', () => {
  handleEdit(
    null,
    () => goodsList,
    () => filteredList,
    (list) => (goodsList = list),
    (list) => (filteredList = list),
    () => selectedGoods,
    (value) => { selectedGoods = value },
    renderForm,
    app,
    rerender,
    header,
    table
  )
})

thElements.forEach((th) => {
  th.addEventListener('click', () => {
    const key = th.id as keyof Goods
    const isSameKey = sortState.key === key
    const newOrder =
      isSameKey && sortState.order === 'ascending' ? 'descending' : 'ascending'
    sortState = { key, order: newOrder }
    rerender()
  })
})
