import type { Goods } from '../models/models'

const data: Goods[] = [
  {
    id: '1',
    goodsName: 'RTX 5090',
    goodsRack: '14',
    goodsWeight: '20',
    storageTime: '2023-12-29'
  },
  {
    id: '2',
    goodsName: 'Prabhupada\'s books',
    goodsRack: '11',
    goodsWeight: '12',
    storageTime: '2025-07-07'
  },
  {
    id: '3',
    goodsName: 'Kishor\'s vinyl',
    goodsRack: '2',
    goodsWeight: '15',
    storageTime: '2022-07-18'
  },
  {
    id: '4',
    goodsName: 'LTD V50',
    goodsRack: '15',
    goodsWeight: '3',
    storageTime: '2024-11-04'
  }
]

const getGoodsList = () => [...data]

export default getGoodsList
