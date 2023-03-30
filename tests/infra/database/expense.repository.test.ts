import { Test, TestingModule } from '@nestjs/testing';
import {
  DatabaseService,
  ExpenseRepository,
  MockRepository,
} from '@/infra/database/prisma';

describe('Infra - ExpenseRepository', () => {
  let app: TestingModule;
  let sut: ExpenseRepository;
  let mockRepository: MockRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [DatabaseService, ExpenseRepository, MockRepository],
    }).compile();

    mockRepository = app.get<MockRepository>(MockRepository);
    sut = await app.resolve(ExpenseRepository);
  });

  beforeEach(async () => {
    await mockRepository.createMocksToTestRepository();
  });

  afterEach(async () => {
    await mockRepository.deleteMocks();
  });

  test('Should create expense | createExpense', async () => {
    const expenseName = 'expense';
    const expenseValue = 100;
    const dueDate = new Date('3000-01-01');
    const userId = '5';

    const result = await sut.createExpense(
      expenseName,
      expenseValue,
      dueDate,
      userId,
    );

    expect(result.expenseName).toBe(expenseName);
  });

  test('Should update expense | updateExpenseById', async () => {
    const id = '6';
    const expenseName = 'expense_two';
    const expenseValue = 200;
    const dueDate = new Date('3000-02-01');

    const result = await sut.updateExpenseById(id, {
      expenseName,
      expenseValue,
      dueDate,
    });

    expect(result.expenseName).toBe(expenseName);
    expect(result.expenseValue).toBe(expenseValue);
    expect(result.dueDate).toEqual(dueDate);
  });

  test('Should update expense | updateExpenseById', async () => {
    const id = '6';
    const expenseName = 'expense_two';
    const expenseValue = 200;

    const result = await sut.updateExpenseById(id, {
      expenseName,
      expenseValue,
    });

    expect(result.expenseName).toBe(expenseName);
    expect(result.expenseValue).toBe(expenseValue);
  });

  test('Should get expense | getExpenseById', async () => {
    const id = '6';
    const expenseName = 'expense';

    const result = await sut.getExpenseById(id);

    expect(result.expenseName).toBe(expenseName);
  });

  test('Should get null | getExpenseById', async () => {
    const id = '0';

    const result = await sut.getExpenseById(id);

    expect(result).toBe(null);
  });

  test('Should get expenses | getExpensesByUserId', async () => {
    const id = '5';
    const expenseName = 'expense';

    const result = await sut.getExpensesByUserId(id);

    expect(result[0].expenseName).toBe(expenseName);
  });

  test('Should delete expense | deleteExpenseById', async () => {
    const id = '6';
    const expenseName = 'expense';

    const result = await sut.deleteExpenseById(id);

    expect(result.expenseName).toBe(expenseName);
  });
});
