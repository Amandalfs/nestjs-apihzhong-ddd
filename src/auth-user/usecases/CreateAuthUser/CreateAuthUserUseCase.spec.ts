import { AuthUser } from '../../domain/entities/authUser.entity';
import { AuthUserRepositoryInterface } from '../../domain/repositories/authUserRepositoryInterface';
import { CreateAuthUserUseCase } from './CreateAuthUserUseCase';

interface TypeSuit {
  authUserRepository: AuthUserRepositoryInterface;
  suit: CreateAuthUserUseCase;
}

const makeSuit = (): TypeSuit => {
  const authUserRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findAll: jest.fn(),
  };

  const suit = new CreateAuthUserUseCase(authUserRepository);
  return {
    suit,
    authUserRepository,
  };
};

describe('create auth user use case', () => {
  it('should create customer', async () => {
    const { suit } = makeSuit();
    const input = {
      email: 'email@email.com',
      password: '12345678',
      customerId: 'id',
    };

    const result = await suit.execute(input);
    expect(result.id).toBeDefined();
    expect(result.email).toEqual(input.email);
  });

  it('should be thrown error if a user with the same email already exists.', async () => {
    const { suit, authUserRepository } = makeSuit();
    jest.spyOn(authUserRepository, 'findByEmail').mockResolvedValue(
      new AuthUser({
        email: 'email@email.com',
        password: '12345678',
        customerId: 'id',
      }),
    );
    const input = {
      email: 'email@email.com',
      password: '12345678',
      customerId: 'id',
    };
    expect(async () => {
      await suit.execute(input);
    }).rejects.toThrow('A Auth User with this email already exists.');
  });
});
