export class SectionError extends Error {
  public static fromEmptyName() {
    return new SectionError('Section name can not be empty.')
  }

  static fromNegativeAmount() {
    return new SectionError('Section card amount can not be negative.')
  }
}
