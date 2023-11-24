import { AuthUser } from '../../domain/entities/authUser.entity';
import { AuthUserRepositoryInterface } from '../../domain/repositories/authUserRepositoryInterface';
import { CreateAdminSupportAgencyUseCase } from './CreateAdminSupportAgencyUseCase';

interface TypeSuit {
  authUserRepository: AuthUserRepositoryInterface;
  suit: CreateAdminSupportAgencyUseCase;
}

const makeSuit = (): TypeSuit => {
  const authUserRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findAll: jest.fn(),
  };

  const suit = new CreateAdminSupportAgencyUseCase(authUserRepository);
  return {
    suit,
    authUserRepository,
  };
};

describe('create auth user use case', () => {
  it('should create admin support admin agency', async () => {
    const { suit } = makeSuit();
    const input = {
      email: 'email@hzhong.com',
      password: '12345678',
    };

    const result = await suit.execute(input);
    expect(result.id).toBeDefined();
    expect(result.email).toEqual(input.email);
  });

  it('should be thrown error if a user with the same email already exists.', async () => {
    const { suit, authUserRepository } = makeSuit();
    jest.spyOn(authUserRepository, 'findByEmail').mockResolvedValue(
      new AuthUser({
        email: 'email@hzhong.com',
        password: '12345678',
        hash: true,
      }),
    );
    const input = {
      email: 'email@email.com',
      password: '12345678',
      customerId: 'id',
    };
    expect(async () => {
      await suit.execute(input);
    }).rejects.toThrow('A Admin agency with this email already exists.');
  });
});
