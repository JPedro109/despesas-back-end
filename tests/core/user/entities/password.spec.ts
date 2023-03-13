import { Password, InvalidPasswordError } from '@/core/domain/users/entities';

describe('Object Value - Password', () => {
  test('Should not create password, because password is empty', () => {
    const invalidPassword = '';

    const sut = Password.create(invalidPassword);

    expect(sut).toBeInstanceOf(InvalidPasswordError);
  });

  test('Should not create password, because password is not respect regEx', () => {
    const invalidPassword = 'password';

    const sut = Password.create(invalidPassword);

    expect(sut).toBeInstanceOf(InvalidPasswordError);
  });

  test('Should create password', () => {
    const password = 'Password1234';

    const sut = Password.create(password);

    if (!(sut instanceof Error)) expect(sut.value).toBe(password);
    expect(sut).toBeInstanceOf(Password);
  });
});
