import type { Card } from '@/DeckBuilder/Domain/Entities/Card'

export class CardGroup {
  public constructor(
    public name: string,
    public amount: number,
    public cards: Card[]
  ) {}
}
