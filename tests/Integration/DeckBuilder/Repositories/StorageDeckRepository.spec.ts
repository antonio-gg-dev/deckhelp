import { StorageDeckRepository } from '@/DeckBuilder/Infrastructure/Repositories/StorageDeckRepository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'
import { DeckType } from '@/DeckBuilder/Domain/Entities/DeckType'

describe('StorageDeckRepository', () => {
  let repository: StorageDeckRepository
  let storage: Storage

  beforeEach(() => {
    storage = {} as Storage

    repository = new StorageDeckRepository(storage)
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
            name: 'Expected Deck'
          }
        ])
      )

      const deck = repository.getByIndex(0)

      expect(storage.getItem).toHaveBeenCalledWith('decks')
      expect(deck).toEqual(new Deck('Expected Deck', DeckType.commander, []))
    })

    it('should return deck with index "1"', () => {
      storage.getItem = vi.fn().mockReturnValueOnce(
        JSON.stringify([
          {
            name: 'Unexpected Deck'
          },
          {
            name: 'Expected Deck'
          }
        ])
      )

      const deck = repository.getByIndex(1)

      expect(storage.getItem).toHaveBeenCalledWith('decks')
      expect(deck).toEqual(new Deck('Expected Deck', DeckType.commander, []))
    })

    it('should autocomplete missing data from the deck', () => {
      storage.getItem = vi.fn().mockReturnValueOnce(JSON.stringify([{}]))

      const deck = repository.getByIndex(0)

      expect(storage.getItem).toHaveBeenCalledWith('decks')
      expect(deck).toEqual(new Deck('Unnamed Deck', DeckType.commander, []))
    })
  })
})
