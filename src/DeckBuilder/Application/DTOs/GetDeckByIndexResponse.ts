export type GetDeckByIndexResponse = ErrorResponse | DeckResponse

export interface ErrorResponse {
  error: string
}

export interface DeckResponse {
  name: string
}
