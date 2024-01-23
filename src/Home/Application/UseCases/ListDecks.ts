import type { CreateDeckRepository } from '@/Home/Domain/Repositories/CreateDeckRepository'
import type { ListDecksResponse } from '@/Home/Application/DTOs/ListDecksResponse'

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
