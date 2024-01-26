import type { Format } from '@/DeckBuilder/Domain/Entities/Format'
import { Section } from '@/DeckBuilder/Domain/Entities/Section'
import { DeckError } from '@/DeckBuilder/Domain/Errors/DeckError'

export class Deck {
  private _name!: string

  public constructor(
    name: string,
    public format: Format,
    public sections: Section[]
  ) {
    this.name = name
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    if (name.length < 1) {
      throw DeckError.fromEmptyName()
    }

    this._name = name
  }
}
