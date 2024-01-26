import type { Card } from '@/DeckBuilder/Domain/Entities/Card'

export class Section {
  public constructor(
    public name: string,
    public amount: number,
    public cards: Card[]
  ) {}
}
