import type { DeckRepository } from '@/DeckBuilder/Domain/Repositories/DeckRepository'
import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'
import type { StorageDeck } from '@/DeckBuilder/Infrastructure/DTOs/StorageDeck'
import { Format } from '@/DeckBuilder/Domain/Entities/Format'
import { StorageFormat } from '@/DeckBuilder/Infrastructure/DTOs/StorageFormat'
import { Section } from '@/DeckBuilder/Domain/Entities/Section'
import type { StorageSection } from '@/DeckBuilder/Infrastructure/DTOs/StorageSection'

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
    let storedCardGroups: StorageSection[] = []

    if (Array.isArray(storedDeck.sections)) {
      storedCardGroups = storedDeck.sections
    }

    return new Deck(
      storedDeck.name ?? 'Unnamed Deck',
      this.storedFormatToDomain(storedDeck.format),
      storedCardGroups.map((storedCardGroup) => this.storedSectionToDomain(storedCardGroup))
    )
  }

  private storedFormatToDomain(storedFormat: StorageFormat | unknown): Format {
    switch (storedFormat) {
      case StorageFormat.commander:
        return Format.commander
      case StorageFormat.brawl:
        return Format.brawl
      default:
        return Format.commander
    }
  }

  private storedSectionToDomain(storageCardGroup: StorageSection): Section {
    return new Section(storageCardGroup.name ?? 'Unnamed Group', storageCardGroup.amount ?? 0, [])
  }

  private domainDeckToStored(deck: Deck): StorageDeck {
    return {
      name: deck.name,
      format: this.domainFormatToStored(deck.format),
      sections: deck.sections.map((cardGroup) => this.domainSectionToStored(cardGroup))
    }
  }

  private domainFormatToStored(format: Format): StorageFormat {
    switch (format) {
      case Format.commander:
        return StorageFormat.commander
      case Format.brawl:
        return StorageFormat.brawl
    }
  }

  private domainSectionToStored(section: Section): StorageSection {
    return {
      name: section.name,
      amount: section.amount,
      cards: []
    }
  }
}
