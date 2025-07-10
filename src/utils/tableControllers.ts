import type { Goods } from '../models/models'
import { sortCompare } from './helpers'
import { renderTableRow } from '../components/table.ts'
import { saveGoodsToStorage } from './localStorageUtils.ts'
import type renderForm from '../components/form.ts'
import { showLoader } from './showLoader.ts'

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
  setGoodsList: (list: Goods[]) => void,
  setFilteredList: (list: Goods[]) => void,
  rerender: () => void
) => {
  const newGoodsList = getGoodsList().filter(item => item.id !== id)
  const newFilteredList = getFilteredList().filter(item => item.id !== id)

  setGoodsList(newGoodsList)
  setFilteredList(newFilteredList)
  saveGoodsToStorage(newGoodsList)
  rerender()
}

export const handleEdit = (
  goods: Goods | null,
  getGoodsList: () => Goods[],
  getFilteredList: () => Goods[],
  setGoodsList: (list: Goods[]) => void,
  setFilteredList: (list: Goods[]) => void,
  getSelected: () => Goods | null,
  setSelected: (value: Goods | null) => void,
  renderFormFn: typeof renderForm,
  container: HTMLElement,
  rerender: () => void,
  ...elementsToRestore: HTMLElement[]
) => {
  setSelected(goods)

  const form = renderFormFn(goods)
  submitForm(
    form,
    getGoodsList,
    getFilteredList,
    setGoodsList,
    setFilteredList,
    getSelected,
    () => setSelected(null),
    container,
    rerender,
    ...elementsToRestore
  )

  container.replaceChildren(form)
}

export const submitForm = (
  formElement: HTMLFormElement,
  getGoodsList: () => Goods[],
  _getFilteredList: () => Goods[],
  setGoodsList: (list: Goods[]) => void,
  setFilteredList: (list: Goods[]) => void,
  getSelectedGoods: () => Goods | null,
  resetSelectedGoods: () => void,
  placement: HTMLElement,
  rerender: () => void,
  ...elements: HTMLElement[]
) => {
  const submitButton = formElement.querySelector('.add')
  submitButton?.addEventListener('click', (e) => {
    e.preventDefault()
    if (!formElement.checkValidity()) return formElement.reportValidity()

    const goods: Goods = {
      id: crypto.randomUUID(),
      goodsName: (document.getElementById('goods-name') as HTMLInputElement).value.trim(),
      goodsRack: (document.getElementById('rack') as HTMLInputElement).value,
      goodsWeight: (document.getElementById('weight') as HTMLInputElement).value,
      storageTime: (document.getElementById('storage-time') as HTMLInputElement).value
    }

    const currentList = getGoodsList()
    const selectedGoods = getSelectedGoods()

    let updatedList: Goods[]

    if (selectedGoods) {
      updatedList = currentList.map((item) =>
        item.id === selectedGoods.id ? { ...item, ...goods, id: item.id } : item
      )
      resetSelectedGoods()
    } else {
      updatedList = [goods, ...currentList]
    }

    setGoodsList(updatedList)
    setFilteredList([...updatedList])
    saveGoodsToStorage(updatedList)

    formElement.reset()
    showLoader(placement, () => {
      placement.replaceChildren(...elements)
      rerender()
    })
  })
}
