import type { Goods } from '../models/models'
import { renderTableRow } from '../components/components'
import { sortCompare } from './helpers'

export type SortState = {
  key: keyof Goods | null
  order: 'ascending' | 'descending'
}

type UpdateListFn = (newList: Goods[]) => void

export const rerenderRows = (
  filteredList: Goods[],
  sortState: SortState,
  tbody: HTMLTableSectionElement,
  onDelete: (id: string) => void
) => {
  const listToRender = [...filteredList]
  if (sortState.key) {
    listToRender.sort((a, b) => sortCompare(a, b, sortState.key!, sortState.order))
  }
  renderTableRow(tbody, listToRender, onDelete)
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
