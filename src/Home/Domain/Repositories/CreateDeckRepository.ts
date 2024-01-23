import type { Deck } from '@/Home/Domain/Entities/Deck'

export interface CreateDeckRepository {
  create(deck: Deck): void
  list(): Deck[]
}
