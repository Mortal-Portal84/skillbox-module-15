import type { Goods } from '../models/models.ts'
import { renderTable } from '../components/components.ts'

let sortState: { key: keyof Goods | null; order: 'ascending' | 'descending' } = {
  key: null,
  order: 'ascending'
}

const getSortState = () => sortState
const setSortState = (newState: typeof sortState) => {
  sortState = newState
}

export const initController = (
  getList: () => Goods[],
  setList: (newList: Goods[]) => void,
  appRoot: HTMLElement,
  headerElement: HTMLElement
) => {
  const updateList = (newList: Goods[]) => {
    setList(newList)
    renderMainPage()
  }

  const renderMainPage = () => {
    appRoot.replaceChildren(
      headerElement,
      renderTable(getList, updateList, getSortState, setSortState)
    )
  }

  renderMainPage()
}


