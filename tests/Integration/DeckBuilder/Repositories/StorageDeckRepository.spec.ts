import { StorageDeckRepository } from '@/DeckBuilder/Infrastructure/Repositories/StorageDeckRepository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'
import { DeckType } from '@/DeckBuilder/Domain/Entities/DeckType'

let repository: StorageDeckRepository
let storage: Storage

beforeEach(() => {
  storage = {} as Storage

  repository = new StorageDeckRepository(storage)
})

describe('list', () => {
  it('should return [] when state is empty', () => {
    storage.getItem = vi.fn().mockReturnValueOnce(null)

    const decks = repository.list()

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(decks).toStrictEqual([])
  })

  it('should return stored decks', () => {
    storage.getItem = vi.fn().mockReturnValueOnce(
      JSON.stringify([
        {
          name: 'Brawl Deck',
          type: 'Brawl'
        },
        {
          name: 'Commander Deck',
          type: 'Commander'
        },
        {
          test: 'Incomplete Deck Data'
        }
      ])
    )

    const decks = repository.list()

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(decks).toStrictEqual([
      new Deck('Brawl Deck', DeckType.brawl, []),
      new Deck('Commander Deck', DeckType.commander, []),
      new Deck('Unnamed Deck', DeckType.commander, [])
    ])
  })
})

describe('getByIndex', () => {
  it('should return null when state is empty', () => {
    storage.getItem = vi.fn().mockReturnValueOnce(null)

    const deck = repository.getByIndex(0)

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(deck).toBeNull()
  })

  it('should return null when index is not found', () => {
    storage.getItem = vi.fn().mockReturnValueOnce('[]')

    const deck = repository.getByIndex(0)

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(deck).toBeNull()
  })

  it('should return deck with index "0"', () => {
    storage.getItem = vi.fn().mockReturnValueOnce(
      JSON.stringify([
        {
          name: 'Expected Deck',
          type: 'Brawl'
        }
      ])
    )

    const deck = repository.getByIndex(0)

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(deck).toEqual(new Deck('Expected Deck', DeckType.brawl, []))
  })

  it('should return deck with index "1"', () => {
    storage.getItem = vi.fn().mockReturnValueOnce(
      JSON.stringify([
        {
          name: 'Unexpected Deck',
          type: 'Brawl'
        },
        {
          name: 'Expected Deck',
          type: 'Commander'
        }
      ])
    )

    const deck = repository.getByIndex(1)

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(deck).toEqual(new Deck('Expected Deck', DeckType.commander, []))
  })

  it('should autocomplete missing data from the deck', () => {
    storage.getItem = vi.fn().mockReturnValueOnce(
      JSON.stringify([
        {
          test: 'Incomplete Deck Data'
        }
      ])
    )

    const deck = repository.getByIndex(0)

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(deck).toEqual(new Deck('Unnamed Deck', DeckType.commander, []))
  })
})
