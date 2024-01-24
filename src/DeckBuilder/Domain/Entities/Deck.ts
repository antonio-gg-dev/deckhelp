import type { DeckType } from '@/DeckBuilder/Domain/Entities/DeckType'
import { CardGroup } from '@/DeckBuilder/Domain/Entities/CardGroup'

export class Deck {
  public constructor(
    public name: string,
    public deckType: DeckType,
    public cardGroups: CardGroup[]
  ) {}
}
