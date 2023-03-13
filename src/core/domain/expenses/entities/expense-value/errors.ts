export class InvalidExpenseValueError extends Error {
  constructor() {
    super();

    this.name = 'InvalidExpenseValueError';
    this.message =
      'O valor da despesa deve ser preenchido e tem que ser maior que zero';
  }
}
