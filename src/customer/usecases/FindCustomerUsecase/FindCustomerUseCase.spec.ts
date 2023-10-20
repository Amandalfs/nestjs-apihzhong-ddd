import { FindCustomerUseCase } from './FindCustomerUseCase';
import { CustomerRepositoryInterface } from './../../domain/repositories/repository-customer';
import { MakeCustomer } from './../../domain/factories/makeCustomer';

interface TypeSuit {
  customerRepository: CustomerRepositoryInterface;
  suit: FindCustomerUseCase;
}

const makeSuit = (): TypeSuit => {
  const customer = MakeCustomer.customer({
    cpf: '123.456.789-11',
    email: 'email@email.com',
    username: 'username',
    name: 'name',
  });
  const customerRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn().mockResolvedValue(customer),
    findByEmail: jest.fn(),
    findByUsername: jest.fn(),
    findByCpf: jest.fn(),
    findAll: jest.fn(),
  };

  const suit = new FindCustomerUseCase(customerRepository);
  return {
    suit,
    customerRepository,
  };
};

describe('find customer use case tests units', () => {
  it('should find customer', async () => {
    const { suit } = makeSuit();

    const customer = await suit.execute({ id: 'id' });

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('name');
    expect(customer.username).toBe('username');
  });
});
