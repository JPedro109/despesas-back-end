export class InvalidDueDateError extends Error {
  constructor() {
    super();

    this.name = 'InvalidDueDateError';
    this.message =
      'A data de vencimento deve ser preenchida e tem que ser maior que a data atual';
  }
}
