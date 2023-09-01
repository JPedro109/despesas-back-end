export class InvalidEmailError extends Error {
  constructor(email: string) {
    super();
    this.name = 'InvalidEmailError';
    this.message = `Esse email (${email}) é inválido`;
  }
}
