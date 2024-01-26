export class DeckError extends Error {
  public static fromEmptyName() {
    return new DeckError('Deck name can not be empty.')
  }
}
