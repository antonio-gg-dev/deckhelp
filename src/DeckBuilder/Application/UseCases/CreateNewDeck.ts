import type { CreateDeckRepository } from '@/DeckBuilder/Domain/Repositories/CreateDeckRepository'
import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'

export class CreateNewDeck {
  public constructor(public repository: CreateDeckRepository) {}

  public create(deckName: string) {
    const deck = new Deck(deckName)

    this.repository.create(deck)
  }
}
