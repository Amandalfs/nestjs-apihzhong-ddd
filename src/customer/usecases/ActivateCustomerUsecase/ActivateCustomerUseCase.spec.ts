import { CustomerRepositoryInterface } from './../../domain/repositories/repository-customer';
import { MakeCustomer } from './../../domain/factories/makeCustomer';
import { ActivateCustomerUseCase } from './ActivateCustomerUseCase';

interface TypeSuit {
  customerRepository: CustomerRepositoryInterface;
  suit: ActivateCustomerUseCase;
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

  const suit = new ActivateCustomerUseCase(customerRepository);

  return {
    suit,
    customerRepository,
  };
};

describe('activate customer use case tests units', () => {
  it('should activate customer', async () => {
    const { suit } = makeSuit();
    const customerActivated = await suit.execute({
      id: 'id',
    });

    expect(customerActivated.id).toBeDefined();
    expect(customerActivated.name).toEqual('name');
    expect(customerActivated.active).toEqual(true);
  });
});
