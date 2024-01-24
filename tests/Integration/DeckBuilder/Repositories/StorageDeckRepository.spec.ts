import { StorageDeckRepository } from '../../../../src/DeckBuilder/Infrastructure/Repositories/StorageDeckRepository'
import { beforeEach, describe, expect, it, vi } from 'vitest'

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

      const deck = repository.getByIndex(3)

      expect(storage.getItem).toHaveBeenCalledWith('decks')
      expect(deck).toBeNull()
    })
  })
})
