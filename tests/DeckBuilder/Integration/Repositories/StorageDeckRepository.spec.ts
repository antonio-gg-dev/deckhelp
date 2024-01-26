import { StorageDeckRepository } from '@/DeckBuilder/Infrastructure/Repositories/StorageDeckRepository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'
import { Format } from '@/DeckBuilder/Domain/Entities/Format'
import { Section } from '@/DeckBuilder/Domain/Entities/Section'

let repository: StorageDeckRepository
let storage: Storage

beforeEach(() => {
  storage = {} as Storage

  repository = new StorageDeckRepository(storage)
})

describe('create', () => {
  it('should store given deck', () => {
    storage.getItem = vi.fn().mockReturnValueOnce(null)
    storage.setItem = vi.fn()

    repository.create(
      new Deck('Expected Deck', Format.brawl, [
        new Section('Creatures', 38, []),
        new Section('Lands', 22, [])])
    )

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(storage.setItem).toHaveBeenCalledWith(
      'decks',
      JSON.stringify([
        {
          name: 'Expected Deck',
          format: 'Brawl',
          sections: [
            {
              name: 'Creatures',
              amount: 38,
              cards: []
            },
            {
              name: 'Lands',
              amount: 22,
              cards: []
            }
          ]
        }
      ])
    )
  })

  it('should keep storing many decks', () => {
    storage.getItem = vi.fn().mockReturnValueOnce(
      JSON.stringify([
        {
          name: 'Already Stored Deck',
          format: 'Brawl',
          sections: []
        }
      ])
    )
    storage.setItem = vi.fn()

    repository.create(new Deck('New Stored Deck', Format.commander, []))

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(storage.setItem).toHaveBeenCalledWith(
      'decks',
      JSON.stringify([
        {
          name: 'Already Stored Deck',
          format: 'Brawl',
          sections: []
        },
        {
          name: 'New Stored Deck',
          format: 'Commander',
          sections: []
        }
      ])
    )
  })
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
          format: 'Brawl',
          sections: [
            {
              name: 'Spells',
              amount: 60,
              cards: []
            }
          ]
        },
        {
          name: 'Commander Deck',
          format: 'Commander',
          sections: [
            {
              test: 'Incomplete Card Group Data'
            }
          ]
        },
        {
          test: 'Incomplete Deck Data'
        }
      ])
    )

    const decks = repository.list()

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(decks).toStrictEqual([
      new Deck('Brawl Deck', Format.brawl, [new Section('Spells', 60, [])]),
      new Deck('Commander Deck', Format.commander, [new Section('Unnamed Group', 0, [])]),
      new Deck('Unnamed Deck', Format.commander, [])])
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
          format: 'Brawl'
        }
      ])
    )

    const deck = repository.getByIndex(0)

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(deck).toEqual(new Deck('Expected Deck', Format.brawl, []))
  })

  it('should return deck with index "1"', () => {
    storage.getItem = vi.fn().mockReturnValueOnce(
      JSON.stringify([
        {
          name: 'Unexpected Deck',
          format: 'Brawl'
        },
        {
          name: 'Expected Deck',
          format: 'Commander'
        }
      ])
    )

    const deck = repository.getByIndex(1)

    expect(storage.getItem).toHaveBeenCalledWith('decks')
    expect(deck).toEqual(new Deck('Expected Deck', Format.commander, []))
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
    expect(deck).toEqual(new Deck('Unnamed Deck', Format.commander, []))
  })
})
