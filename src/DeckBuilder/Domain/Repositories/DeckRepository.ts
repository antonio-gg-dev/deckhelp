import type { Deck } from '@/DeckBuilder/Domain/Entities/Deck'

export interface CreateDeckRepository {
  create(deck: Deck): void
  list(): Deck[]
}
