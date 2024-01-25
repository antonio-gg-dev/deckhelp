import type { DeckRepository } from '@/DeckBuilder/Domain/Repositories/DeckRepository'
import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'
import type { StorageDeck } from '@/DeckBuilder/Infrastructure/DTOs/StorageDeck'
import { DeckType } from '@/DeckBuilder/Domain/Entities/DeckType'
import { StorageDeckType } from '@/DeckBuilder/Infrastructure/DTOs/StorageDeckType'
import { CardGroup } from '@/DeckBuilder/Domain/Entities/CardGroup'
import type { StorageCardGroup } from '@/DeckBuilder/Infrastructure/DTOs/StorageCardGroup'

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
    let storedCardGroups: StorageCardGroup[] = []

    if (Array.isArray(storedDeck.cardGroups)) {
      storedCardGroups = storedDeck.cardGroups
    }

    return new Deck(
      storedDeck.name ?? 'Unnamed Deck',
      this.storedTypeToDomain(storedDeck.type),
      storedCardGroups.map((storedCardGroup) => this.storedCardGroupToDomain(storedCardGroup))
    )
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

  private storedCardGroupToDomain(storageCardGroup: StorageCardGroup): CardGroup {
    return new CardGroup(storageCardGroup.name ?? 'Unnamed Group', storageCardGroup.amount ?? 0, [])
  }

  private domainDeckToStored(deck: Deck): StorageDeck {
    return {
      name: deck.name,
      type: this.domainTypeToStored(deck.deckType),
      cardGroups: deck.cardGroups.map((cardGroup) => this.domainCardGroupToStored(cardGroup))
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

  private domainCardGroupToStored(cardGroup: CardGroup): StorageCardGroup {
    return {
      name: cardGroup.name,
      amount: cardGroup.amount,
      cards: []
    }
  }
}
