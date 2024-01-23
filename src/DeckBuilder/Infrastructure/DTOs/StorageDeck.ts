export interface StorageDeck {
  name: string
  type: StorageDeckType.commander
  components: StorageComponent[]
}

export enum StorageDeckType {
  commander = 'Commander'
}

export interface StorageComponent {
  name: string
  amount: number
  cards: []
}
