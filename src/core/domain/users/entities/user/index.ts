import {
  Email,
  Password,
  InvalidEmailError,
  InvalidPasswordError,
} from '@/core/domain/users/entities';

export class User {
  private constructor(
    public readonly email: Email,
    public readonly password: Password,
  ) {
    this.email = email;
    this.password = password;
    Object.freeze(this);
  }

  static create(
    email: string,
    password: string,
  ): User | InvalidEmailError | InvalidPasswordError {
    const userOrError = Email.create(email);

    if (userOrError instanceof Error) return userOrError;

    const passwordOrError = Password.create(password);

    if (passwordOrError instanceof Error) return passwordOrError;

    return new User(userOrError, passwordOrError);
  }
}
