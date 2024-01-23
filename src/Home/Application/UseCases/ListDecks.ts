import type { CreateDeckRepository } from '@/Home/Domain/Repositories/CreateDeckRepository'

export class ListDecks {
  public constructor(public repository: CreateDeckRepository) {}

  public list(): string[] {
    return this.repository.list().map((deck) => deck.name)
  }
}
