import type { DeckRepository } from '@/DeckBuilder/Domain/Repositories/DeckRepository'

export class GetDeckByIndex {
  public constructor(public repository: DeckRepository) {}

  public byIndex(index: number) {
    const deck = this.repository.getByIndex(index)

    if (deck === null) {
      return {
        error: 'Deck not found.'
      }
    }

    return {
      name: deck.name
    }
  }
}
