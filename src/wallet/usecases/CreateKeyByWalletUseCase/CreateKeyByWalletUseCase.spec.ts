import { WalletRepositoryInterface } from './../../domain/wallet/repositories/walletRepository';
import { CreateKeyByWalletUseCase } from './CreateKeyByWalletUseCase';
import { Wallet } from './../../domain/wallet/entities/wallet';

interface TypeSuit {
  walletRepository: WalletRepositoryInterface;
  suit: CreateKeyByWalletUseCase;
}

const makeSuit = (): TypeSuit => {
  const walletRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn().mockResolvedValue(
      new Wallet({
        agency: '001',
        agency_id: '1',
        customer_id: '1',
        typeAccount: 'poupanca',
        balance: 0,
      }),
    ),
    findAll: jest.fn(),
    findByKey: jest.fn(),
  };

  const facadeRepository = {
    findById: jest.fn().mockResolvedValue({
      name: 'name',
      email: 'email@email.com',
      cpf: '123.456.789-11',
      id: '1',
    }),
  };

  const suit = new CreateKeyByWalletUseCase(walletRepository, facadeRepository);

  return {
    walletRepository,
    suit,
  };
};

describe('create key by wallet tests units', () => {
  it('should create key with email', async () => {
    const { suit } = makeSuit();

    const input = {
      id: 'id',
      typeKey: 'email',
    };
    const response = await suit.execute(input);
    expect(response.keyEmail).toEqual('email@email.com');
  });

  it('should create key with cpf', async () => {
    const { suit } = makeSuit();

    const input = {
      id: 'id',
      typeKey: 'cpf',
    };

    const response = await suit.execute(input);
    expect(response.keyCpf).toEqual('123.456.789-11');
  });

  it('should create key with random', async () => {
    const { suit } = makeSuit();

    const input = {
      id: 'id',
      typeKey: 'cpf',
    };

    const response = await suit.execute(input);
    expect(response.keyRandom).toBeDefined();
  });
});
