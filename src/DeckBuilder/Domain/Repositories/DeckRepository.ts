import type { Deck } from '@/DeckBuilder/Domain/Entities/Deck'

export interface DeckRepository {
  create(deck: Deck): void
  list(): Deck[]
  getByIndex(index: number): Deck | null
}
