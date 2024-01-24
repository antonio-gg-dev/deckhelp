import { StorageDeckType } from '@/DeckBuilder/Infrastructure/DTOs/StorageDeckType'
import type { StorageCardGroup } from '@/DeckBuilder/Infrastructure/DTOs/StorageCardGroup'

export interface StorageDeck {
  name: string
  type: StorageDeckType
  cardGroups: StorageCardGroup[]
}
