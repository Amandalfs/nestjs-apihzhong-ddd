import { EventDispatcher } from '../../domain/events/eventDispatcher';
import { MakeCustomer } from '../../domain/factories/makeCustomer';
import { CustomerRepositoryInterface } from '../../domain/repositories/repository-customer';
import { CreateCustomerUseCase } from './CreateCustomerUseCase';
import { CreateCredencialsHandler } from '../../domain/events/CreateCredencialsHandler';

interface TypeSuit {
  customerRepository: CustomerRepositoryInterface;
  suit: CreateCustomerUseCase;
}

const makeSuit = (): TypeSuit => {
  const customerRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findByUsername: jest.fn(),
    findByCpf: jest.fn(),
    findAll: jest.fn(),
  };

  const AuthUserFacade = {
    createUserAuth: jest.fn(),
  };

  const eventDispatcher = new EventDispatcher();
  const eventHadler = new CreateCredencialsHandler(AuthUserFacade);

  const suit = new CreateCustomerUseCase(
    customerRepository,
    eventDispatcher,
    eventHadler,
  );
  return {
    suit,
    customerRepository,
  };
};

describe('create customer use case', () => {
  it('should create customer', async () => {
    const { suit } = makeSuit();
    const input = {
      cpf: '123.456.789-11',
      email: 'email@email.com',
      name: 'test',
      username: 'test username',
      password: '12345678',
    };

    const result = await suit.execute(input);
    expect(result.id).toBeDefined();
    expect(result.email).toEqual(input.email);
    expect(result.name).toEqual(input.name);
    expect(result.username).toEqual(input.username);
    expect(result.cpf).toEqual(input.cpf);
  });

  it('should be thrown error if a user with the same email already exists.', async () => {
    const { suit, customerRepository } = makeSuit();
    const customerMock = MakeCustomer.customer({
      cpf: '456.789.123-11',
      email: 'email@email.com',
      name: 'test 2',
      username: 'test username 2',
    });
    jest
      .spyOn(customerRepository, 'findByEmail')
      .mockResolvedValue(customerMock);
    const input = {
      cpf: '123.456.789-11',
      email: 'email@email.com',
      name: 'test',
      username: 'test username',
      password: '12345678',
    };

    expect(async () => {
      await suit.execute(input);
    }).rejects.toThrow('A Customer with this email already exists.');
  });

  it('should be thrown error if a user with the same username already exists.', async () => {
    const { suit, customerRepository } = makeSuit();
    const customerMock = MakeCustomer.customer({
      cpf: '456.789.123-11',
      email: 'email2@email.com',
      name: 'test 2',
      username: 'test username',
    });
    jest
      .spyOn(customerRepository, 'findByUsername')
      .mockResolvedValue(customerMock);
    const input = {
      cpf: '123.456.789-11',
      email: 'email@email.com',
      name: 'test',
      username: 'test username',
      password: '12345678',
    };

    expect(async () => {
      await suit.execute(input);
    }).rejects.toThrow('A Customer with this username already exists.');
  });

  it('should be thrown error if a user with the same cpf already exists.', async () => {
    const { suit, customerRepository } = makeSuit();
    const customerMock = MakeCustomer.customer({
      cpf: '123.456.789-11',
      email: 'email2@email.com',
      name: 'test 2',
      username: 'test username 2',
    });
    jest.spyOn(customerRepository, 'findByCpf').mockResolvedValue(customerMock);
    const input = {
      cpf: '123.456.789-11',
      email: 'email@email.com',
      name: 'test',
      username: 'test username',
      password: '12345678',
    };

    expect(async () => {
      await suit.execute(input);
    }).rejects.toThrow('A Customer with this cpf already exists.');
  });
});
