export class JsonWebTokenInvalidError extends Error {
  constructor() {
    super();
    this.name = 'JsonWebTokenInvalidError';
    this.message = 'Token inválido';
  }
}
