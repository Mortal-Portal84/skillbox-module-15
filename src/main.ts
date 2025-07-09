import { renderForm, renderHeader } from './components/components.ts'

import type { Goods } from './models/models.ts'
import { initController } from './utils/uiController.ts'

import './style.css'

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

const app = document.getElementById('app')
const header = renderHeader()
const form = renderForm()

const addButton = header.querySelector('.add')
addButton?.addEventListener('click', () => {
  app?.replaceChildren(form)
})

const submitButton = form.querySelector('.add')
submitButton?.addEventListener('click', (e) => {
  e.preventDefault()

  if (!form.checkValidity()) {
    form.reportValidity()
    return
  }

  const nameInput = document.getElementById('goods-name') as HTMLInputElement
  const rackInput = document.getElementById('rack') as HTMLInputElement
  const weightInput = document.getElementById('weight') as HTMLInputElement
  const storageDateInput = document.getElementById('storage-time') as HTMLInputElement

  const goods: Goods = {
    id: crypto.randomUUID(),
    goodsName: nameInput.value,
    goodsRack: rackInput.value,
    goodsWeight: weightInput.value,
    storageTime: storageDateInput.value
  }

  goodsList = [goods, ...goodsList]
  form.reset()

  initController(
    () => goodsList,
    (newList) => { goodsList = newList },
    app!,
    header
  )
})

initController(
  () => goodsList,
  (newList) => { goodsList = newList },
  app!,
  header
)
