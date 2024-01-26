import type { DeckRepository } from '@/DeckBuilder/Domain/Repositories/DeckRepository'
import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'
import { Format } from '@/DeckBuilder/Domain/Enums/Format'

export class CreateNewDeck {
  public constructor(public repository: DeckRepository) {}

  public create(deckName: string) {
    const deck = new Deck(deckName, Format.commander, [])

    this.repository.create(deck)
  }
}
