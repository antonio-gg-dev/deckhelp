export interface StorageDeck {
  name: string
  type: StorageDeckType.commander
  cardGroups: StorageCardGroup[]
}

export enum StorageDeckType {
  commander = 'Commander'
}

export interface StorageCardGroup {
  name: string
  amount: number
  cards: []
}
