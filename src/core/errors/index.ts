export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super();
    this.name = 'InvalidParamError';
    this.message = paramName;
  }
}

export class NotFoundError extends Error {
  constructor(paramName: string) {
    super();
    this.name = 'NotFoundError';
    this.message = paramName;
  }
}

export class UnauthorizedError extends Error {
  constructor(paramName: string) {
    super();
    this.name = 'UnauthorizedError';
    this.message = paramName;
  }
}
