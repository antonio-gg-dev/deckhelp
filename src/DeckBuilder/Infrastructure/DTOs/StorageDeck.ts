import { StorageFormat } from '@/DeckBuilder/Infrastructure/DTOs/StorageFormat'
import type { StorageSection } from '@/DeckBuilder/Infrastructure/DTOs/StorageSection'

export interface StorageDeck {
  name: string
  format: StorageFormat
  sections: StorageSection[]
}
