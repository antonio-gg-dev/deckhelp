import type { DeckRepository } from '@/DeckBuilder/Domain/Repositories/DeckRepository'
import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'
import type { StorageDeck } from '@/DeckBuilder/Infrastructure/DTOs/StorageDeck'
import { StorageDeckType } from '@/DeckBuilder/Infrastructure/DTOs/StorageDeck'

export class StorageDeckRepository implements DeckRepository {
  public constructor(private storage: Storage) {}

  public create(newDeck: Deck) {
    const decks = this.getStoredDecks()

    decks.push({
      name: newDeck.name,
      type: StorageDeckType.commander,
      components: [
        {
          name: 'Commander',
          amount: 1,
          cards: []
        },
        {
          name: 'Creatures',
          amount: 29,
          cards: []
        },
        {
          name: 'Spells',
          amount: 20,
          cards: []
        },
        {
          name: 'Ramp',
          amount: 10,
          cards: []
        },
        {
          name: 'Lands',
          amount: 40,
          cards: []
        }
      ]
    })

    this.storage.setItem('decks', JSON.stringify(decks))
  }

  public list(): Deck[] {
    const decks = this.getStoredDecks()

    return decks.map(this.storedToDomain)
  }

  public getByIndex(index: number): Deck | null {
    const deck = this.getStoredDecks()[index]

    if (deck === undefined) {
      return null
    }

    return this.storedToDomain(deck)
  }

  private getStoredDecks(): StorageDeck[] {
    const storedDecks = JSON.parse(this.storage.getItem('decks') ?? 'null')
    let decks: StorageDeck[] = []

    if (Array.isArray(storedDecks)) {
      decks = storedDecks
    }
    return decks
  }

  private storedToDomain(storedDeck: StorageDeck): Deck {
    return new Deck(storedDeck.name ?? 'Unnamed Deck')
  }
}
