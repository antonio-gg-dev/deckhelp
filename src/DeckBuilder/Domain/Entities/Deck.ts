import type { Format } from '@/DeckBuilder/Domain/Entities/Format'
import { Section } from '@/DeckBuilder/Domain/Entities/Section'

export class Deck {
  public constructor(
    public name: string,
    public format: Format,
    public sections: Section[]
  ) {}
}
