import type { Goods } from '../models/models'
import { sortCompare } from './helpers'
import { renderTableRow } from '../components/table.ts'

export type SortState = {
  key: keyof Goods | null
  order: 'ascending' | 'descending'
}

export type UpdateListFn = (list: Goods[]) => void
export type GetterListFn = () => Goods[]
export type GetterGoodsFn = () => Goods | null
export type SetterGoodsFn = (goods: Goods | null) => void

export const rerenderRows = (
  filteredList: Goods[],
  sortState: SortState,
  tbody: HTMLTableSectionElement,
  onDelete: (id: string) => void,
  onEdit: (goods: Goods) => void
) => {
  const listToRender = [...filteredList]

  if (sortState.key) {
    listToRender.sort((a, b) => sortCompare(a, b, sortState.key!, sortState.order))
  }
  renderTableRow(tbody, listToRender, onDelete, onEdit)
}

export const handleDelete = (
  id: string,
  getGoodsList: () => Goods[],
  getFilteredList: () => Goods[],
  setGoodsList: UpdateListFn,
  setFilteredList: UpdateListFn,
  rerender: () => void
) => {
  const newGoodsList = getGoodsList().filter(item => item.id !== id)
  const newFilteredList = getFilteredList().filter(item => item.id !== id)

  setGoodsList(newGoodsList)
  setFilteredList(newFilteredList)
  rerender()
}

export const handleEdit = (
  goodsToEdit: Goods | null,
  getGoodsList: GetterListFn,
  _getFilteredList: GetterListFn,
  setGoodsList: UpdateListFn,
  setFilteredList: UpdateListFn,
  _getSelectedGoods: GetterGoodsFn,
  setSelectedGoods: SetterGoodsFn,
  renderForm: (goods: Goods | null) => HTMLFormElement,
  root: HTMLElement,
  rerender: () => void,
  ...persistentElements: HTMLElement[]
) => {
  setSelectedGoods(goodsToEdit)
  const form = renderForm(goodsToEdit)

  const submitButton = form.querySelector('.add')!
  submitButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (!form.checkValidity()) return form.reportValidity()

    const goods: Goods = {
      id: goodsToEdit ? goodsToEdit.id : crypto.randomUUID(),
      goodsName: (document.getElementById('goods-name') as HTMLInputElement).value.trim(),
      goodsRack: (document.getElementById('rack') as HTMLInputElement).value,
      goodsWeight: (document.getElementById('weight') as HTMLInputElement).value,
      storageTime: (document.getElementById('storage-time') as HTMLInputElement).value
    }

    let updatedList: Goods[]
    if (goodsToEdit) {
      updatedList = getGoodsList().map(item =>
        item.id === goodsToEdit.id ? goods : item
      )
    } else {
      updatedList = [goods, ...getGoodsList()]
    }

    setGoodsList(updatedList)
    setFilteredList(updatedList)
    setSelectedGoods(null)

    form.reset()
    root.replaceChildren(...persistentElements)
    rerender()
  })

  root.replaceChildren(form)
}
