import { Email, InvalidEmailError } from '@/core/domain/users/entities';

describe('Object Value - Email', () => {
  test('Should not create email, because email is empty', () => {
    const invalidEmail = '';

    const sut = Email.create(invalidEmail);

    expect(sut).toBeInstanceOf(InvalidEmailError);
  });

  test('Should not create email, because email has more than 256 characters', () => {
    const invalidEmail = 'c'.repeat(300);

    const sut = Email.create(invalidEmail);

    expect(sut).toBeInstanceOf(InvalidEmailError);
  });

  test('Should not create email, because email is not respect regEx', () => {
    const invalidEmail = 'email.com';

    const sut = Email.create(invalidEmail);

    expect(sut).toBeInstanceOf(InvalidEmailError);
  });

  test('Should not create email, because the email account has more than 64 characters', () => {
    const invalidAccount = 'c'.repeat(100);

    const sut = Email.create(`${invalidAccount}@test.com`);

    expect(sut).toBeInstanceOf(InvalidEmailError);
  });

  test('Should not create email, because the email domain has more than 64 characters', () => {
    const invalidDomain = 'c'.repeat(300);

    const sut = Email.create(`email@${invalidDomain}.com`);

    expect(sut).toBeInstanceOf(InvalidEmailError);
  });

  test('Should create email', () => {
    const email = 'email@test.com';

    const sut = Email.create(email);

    if (!(sut instanceof Error)) expect(sut.value).toBe(email);
    expect(sut).toBeInstanceOf(Email);
  });
});
