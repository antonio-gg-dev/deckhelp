import type { CreateDeckRepository } from '@/Home/Domain/Repositories/CreateDeckRepository'
import type { Deck } from '@/Home/Domain/Entities/Deck'
import type { StorageDeck } from '@/Home/Infrastructure/Repositories/StorageDeck'

export class StorageCreateDeckRepository implements CreateDeckRepository {
  public constructor(private storage: Storage) {}

  public create(newDeck: Deck) {
    const storedDecks = JSON.parse(this.storage.getItem('decks') ?? 'null')
    let decks: StorageDeck[] = []

    if (Array.isArray(storedDecks)) {
      decks = storedDecks
    }

    decks.push({
      name: newDeck.name
    })

    this.storage.setItem('decks', JSON.stringify(decks))
  }
}
