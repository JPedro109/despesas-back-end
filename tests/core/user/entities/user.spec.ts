import {
  User,
  InvalidEmailError,
  InvalidPasswordError,
} from '@/core/domain/users/entities';

describe('Entity - User', () => {
  test('Should not create user, because email is not valid', () => {
    const invalidEmail = 'email.com';
    const password = 'Password1234';

    const sut = User.create(invalidEmail, password);

    expect(sut).toBeInstanceOf(InvalidEmailError);
  });

  test('Should not create user, because password is not valid', () => {
    const email = 'email@test.com';
    const invalidPassword = 'password';

    const sut = User.create(email, invalidPassword);

    expect(sut).toBeInstanceOf(InvalidPasswordError);
  });

  test('Should create user', () => {
    const email = 'email@test.com';
    const password = 'Password1234';

    const sut = User.create(email, password);

    expect(sut).toBeInstanceOf(User);
  });
});
