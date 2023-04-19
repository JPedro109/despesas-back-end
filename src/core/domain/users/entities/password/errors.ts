export class InvalidPasswordError extends Error {
  constructor() {
    super();
    this.name = 'InvalidPasswordError';
    this.message =
      'Sua senha precisa ter 8 caracteres, uma letra maiúscula, uma minúscula e um número';
  }
}
