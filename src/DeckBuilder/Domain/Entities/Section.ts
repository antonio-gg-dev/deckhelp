import type { Card } from '@/DeckBuilder/Domain/Entities/Card'
import { SectionError } from '@/DeckBuilder/Domain/Errors/SectionError'

export class Section {
  private _name!: string
  private _amount!: number

  public constructor(
    name: string,
    amount: number,
    public cards: Card[]
  ) {
    this.name = name
    this.amount = amount
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    if (name.length < 1) {
      throw SectionError.fromEmptyName()
    }

    this._name = name
  }

  get amount(): number {
    return this._amount
  }

  set amount(amount: number) {
    if (amount < 0) {
      throw SectionError.fromNegativeAmount()
    }

    this._amount = amount
  }
}
