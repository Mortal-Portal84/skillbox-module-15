import { renderForm, renderHeader, renderTable } from './components/components.ts'
import { renderTableRow } from './components/UI-elements.ts'

import './style.css'

const goodsList = [
  {
    name: 'Triumph',
    rack: '14',
    weight: '88',
    date: '2025-07-07'
  },
  {
    name: 'Oi! Oi! Oi!',
    rack: '69',
    weight: '77',
    date: '2025-06-07'
  },
  {
    name: 'Triumph',
    rack: '14',
    weight: '88',
    date: '2025-07-07'
  },
  {
    name: 'Triumph',
    rack: '14',
    weight: '88',
    date: '2025-07-07'
  }
]

const app = document.getElementById('app')
const header = renderHeader()
const form = renderForm()
const table = renderTable()

app?.append(header, table)

const tbody = table.getElementsByTagName('tbody')[0]

renderTableRow(tbody, goodsList)
