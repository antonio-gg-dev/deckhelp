import type { DeckRepository } from '@/DeckBuilder/Domain/Repositories/DeckRepository'
import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'

export class CreateNewDeck {
  public constructor(public repository: DeckRepository) {}

  public create(deckName: string) {
    const deck = new Deck(deckName)

    this.repository.create(deck)
  }
}
