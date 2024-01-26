import { Section } from '@/DeckBuilder/Domain/Entities/Section'
import { describe, expect, it } from 'vitest'
import { SectionError } from '@/DeckBuilder/Domain/Errors/SectionError'

describe('name', () => {
  it('it should reject empty name on construction', () => {
    expect(() => {
      new Section('', 0, [])
    }).toThrowError(SectionError.fromEmptyName())
  })

  it('it should reject empty name on set', () => {
    const section = new Section('Section Name', 0, [])

    expect(() => {
      section.name = ''
    }).toThrowError(SectionError.fromEmptyName())
  })
})

describe('amount', () => {
  it('it should reject negative amount on construction', () => {
    expect(() => {
      new Section('Section Name', -1, [])
    }).toThrowError(SectionError.fromNegativeAmount())
  })

  it('it should reject negative amount on set', () => {
    const section = new Section('Section Name', 0, [])

    expect(() => {
      section.amount = -1
    }).toThrowError(SectionError.fromNegativeAmount())
  })
})
