import type { Card } from '@/DeckBuilder/Domain/Entities/Card'

export class CardGroup {
  public constructor(
    name: string,
    amount: number,
    public cards: Card[]
  ) {}
}
