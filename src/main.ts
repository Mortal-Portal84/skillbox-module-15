import { renderForm, renderHeader, renderTable } from './components/components.ts'

import type { Goods } from './models/models.ts'

import './style.css'

const goodsList: Goods[] = [
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

const app = document.getElementById('app')
const header = renderHeader()
const form = renderForm()
const table = renderTable(goodsList)

app?.append(header, table)

