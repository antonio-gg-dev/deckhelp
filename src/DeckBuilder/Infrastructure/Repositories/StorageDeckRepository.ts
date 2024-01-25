import type { DeckRepository } from '@/DeckBuilder/Domain/Repositories/DeckRepository'
import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'
import type { StorageDeck } from '@/DeckBuilder/Infrastructure/DTOs/StorageDeck'
import { DeckType } from '@/DeckBuilder/Domain/Entities/DeckType'
import { StorageDeckType } from '@/DeckBuilder/Infrastructure/DTOs/StorageDeckType'

export class StorageDeckRepository implements DeckRepository {
  public constructor(private storage: Storage) {}

  public create(newDeck: Deck) {
    const decks = this.getStoredDecks()

    decks.push(this.domainDeckToStored(newDeck))

    this.storage.setItem('decks', JSON.stringify(decks))
  }

  public list(): Deck[] {
    const decks = this.getStoredDecks()

    return decks.map((storedDeck) => this.storedDeckToDomain(storedDeck))
  }

  public getByIndex(index: number): Deck | null {
    const deck = this.getStoredDecks()[index]

    if (deck === undefined) {
      return null
    }

    return this.storedDeckToDomain(deck)
  }

  private getStoredDecks(): StorageDeck[] {
    const storedDecks = JSON.parse(this.storage.getItem('decks') ?? 'null')
    let decks: StorageDeck[] = []

    if (Array.isArray(storedDecks)) {
      decks = storedDecks
    }
    return decks
  }

  private storedDeckToDomain(storedDeck: StorageDeck): Deck {
    return new Deck(storedDeck.name ?? 'Unnamed Deck', this.storedTypeToDomain(storedDeck.type), [])
  }

  private storedTypeToDomain(storedType: StorageDeckType | unknown): DeckType {
    switch (storedType) {
      case StorageDeckType.commander:
        return DeckType.commander
      case StorageDeckType.brawl:
        return DeckType.brawl
      default:
        return DeckType.commander
    }
  }

  private domainDeckToStored(deck: Deck): StorageDeck {
    return {
      name: deck.name,
      type: this.domainTypeToStored(deck.deckType),
      cardGroups: []
    }
  }

  private domainTypeToStored(type: DeckType): StorageDeckType {
    switch (type) {
      case DeckType.commander:
        return StorageDeckType.commander
      case DeckType.brawl:
        return StorageDeckType.brawl
    }
  }
}
