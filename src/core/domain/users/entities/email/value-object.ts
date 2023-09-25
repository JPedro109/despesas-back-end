import { InvalidEmailError } from './error';

export class Email {
  private readonly _email: string;

  private constructor(email: string) {
    this._email = email;
    Object.freeze(this);
  }

  public get value(): string {
    return this._email;
  }

  static create(email: string): Email | InvalidEmailError {
    if (!this.validate(email)) return new InvalidEmailError(email);

    return new Email(email);
  }

  private static validate(email: string): boolean {
    if (!email) return false;

    if (email.length > 256) return false;

    const emailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegEx.test(email)) return false;

    const [account, domain] = email.split('@');

    if (account.length > 64 || domain.length > 64) return false;

    return true;
  }
}
