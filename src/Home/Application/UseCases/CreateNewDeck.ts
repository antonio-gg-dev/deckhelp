import type { CreateDeckRepository } from '@/Home/Domain/Repositories/CreateDeckRepository'
import { Deck } from '@/Home/Domain/Entities/Deck'

export class CreateNewDeck {
  public constructor(public repository: CreateDeckRepository) {}

  public create(deckName: string) {
    const deck = new Deck(deckName)

    this.repository.create(deck)
  }
}
