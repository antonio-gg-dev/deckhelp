import type { DeckRepository } from '@/DeckBuilder/Domain/Repositories/DeckRepository'
import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'
import { DeckType } from '@/DeckBuilder/Domain/Entities/DeckType'

export class CreateNewDeck {
  public constructor(public repository: DeckRepository) {}

  public create(deckName: string) {
    const deck = new Deck(deckName, DeckType.commander, [])

    this.repository.create(deck)
  }
}
