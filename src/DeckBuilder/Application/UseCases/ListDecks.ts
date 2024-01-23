import type { CreateDeckRepository } from '@/DeckBuilder/Domain/Repositories/CreateDeckRepository'
import type { ListDecksResponse } from '@/DeckBuilder/Application/DTOs/ListDecksResponse'

export class ListDecks {
  public constructor(public repository: CreateDeckRepository) {}

  public list(): ListDecksResponse {
    return {
      decks: this.repository.list().map((deck, index) => ({
        index,
        name: deck.name
      }))
    }
  }
}
