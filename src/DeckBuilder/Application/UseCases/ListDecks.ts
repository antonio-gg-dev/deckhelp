import type { DeckRepository } from '@/DeckBuilder/Domain/Repositories/DeckRepository'
import type { ListDecksResponse } from '@/DeckBuilder/Application/DTOs/ListDecksResponse'

export class ListDecks {
  public constructor(public repository: DeckRepository) {}

  public list(): ListDecksResponse {
    return {
      decks: this.repository.list().map((deck, index) => ({
        index,
        name: deck.name
      }))
    }
  }
}
