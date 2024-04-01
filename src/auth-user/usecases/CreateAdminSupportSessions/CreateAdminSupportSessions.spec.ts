import { AuthUserRepositoryInterface } from '@/auth-user/domain/repositories/authUserRepositoryInterface';
import { CreateAdminSupportSessionsUseCase } from './CreateAdminSupportSessionsUseCase';
import { AuthUser } from './../../domain/entities/authUser.entity';
import { JwtService } from '@nestjs/jwt';

interface TypeSuit {
  authUserRepository: AuthUserRepositoryInterface;
  suit: CreateAdminSupportSessionsUseCase;
}

const makeSuit = (): TypeSuit => {
  const authUserRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn().mockReturnValue(
      new Promise((resolve) =>
        resolve(
          new AuthUser({
            email: 'email@email.com',
            password: '12345678',
            hash: true,
          }),
        ),
      ),
    ),
    findAll: jest.fn(),
  };

  const jwt = new JwtService({
    secret: '421vdfbndafp',
    signOptions: { expiresIn: '8h' },
  });

  const suit = new CreateAdminSupportSessionsUseCase(authUserRepository, jwt);
  return {
    suit,
    authUserRepository,
  };
};

describe('create auth user use case', () => {
  it('should create sessions', async () => {
    const { suit } = makeSuit();
    const input = {
      email: 'email@email.com',
      password: '12345678',
    };

    const result = await suit.execute(input);
    expect(result.token).toBeDefined();
  });
  it('should throw an error if the email does not exist.', async () => {
    const { suit, authUserRepository } = makeSuit();
    const input = {
      email: 'email2@email.com',
      password: '12345678',
    };
    jest.spyOn(authUserRepository, 'findByEmail').mockResolvedValue(undefined);

    expect(async () => {
      await suit.execute(input);
    }).rejects.toThrow('The credentials are invalid.');
  });

  it('Should throw an error if the password is incorrect.', async () => {
    const { suit } = makeSuit();
    const input = {
      email: 'email2@email.com',
      password: 'vdfnvosdbvps',
    };

    expect(async () => {
      await suit.execute(input);
    }).rejects.toThrow('The credentials are invalid.');
  });
});
