import { DueDate, InvalidDueDateError } from '@/core/domain/expenses/entities';

describe('Value Object - DueDate', () => {
  test('Should not create DueDate, because value date is errored', () => {
    const invalidDate = new Date('2000-01-01');

    const sut = DueDate.create(invalidDate);

    expect(sut).toBeInstanceOf(InvalidDueDateError);
  });

  test('Should create DueDate', () => {
    const dueDate = new Date('3000-01-01');

    const sut = DueDate.create(dueDate);

    if (!(sut instanceof Error)) expect(sut.value).toBe(dueDate);
    expect(sut).toBeInstanceOf(DueDate);
  });
});
