export class InvalidExpenseNameError extends Error {
  constructor(expenseName: string) {
    super();

    this.name = 'InvalidExpenseNameError';
    this.message = `O nome de despesa (${expenseName}) deve ser preenchido e ter menos de 256 caracteres`;
  }
}
