import { Deck } from '@/DeckBuilder/Domain/Entities/Deck'
import { describe, expect, it } from 'vitest'
import { Format } from '@/DeckBuilder/Domain/Enums/Format'
import { DeckError } from '@/DeckBuilder/Domain/Errors/DeckError'

describe('name', () => {
  it('it should reject empty name on construction', () => {
    expect(() => {
      new Deck('', Format.commander, [])
    }).toThrowError(DeckError.fromEmptyName())
  })

  it('it should reject empty name on set', () => {
    const deck = new Deck('Deck Name', Format.commander, [])

    expect(() => {
      deck.name = ''
    }).toThrowError(DeckError.fromEmptyName())
  })
})
