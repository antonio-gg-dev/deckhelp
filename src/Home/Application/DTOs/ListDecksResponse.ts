export interface ListDecksResponse {
  decks: DeckResponse[]
}

export interface DeckResponse {
  index: number
  name: string
}
