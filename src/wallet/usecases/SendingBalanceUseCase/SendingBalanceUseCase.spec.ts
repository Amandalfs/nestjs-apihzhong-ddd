import { WalletRepositoryInterface } from './../../domain/wallet/repositories/walletRepository';
import { ExtractRepositoryInterface } from './../../domain/wallet/repositories/extractRepository';
import { Wallet } from './../../domain/wallet/entities/wallet';
import { SendingBalanceUseCase } from './SendingBalanceUseCase';

interface TypeSuit {
  walletRepository: WalletRepositoryInterface;
  extractRepository: ExtractRepositoryInterface;
  suit: SendingBalanceUseCase;
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
        balance: 500,
      }),
    ),
    findAll: jest.fn(),
    findByKey: jest.fn().mockResolvedValue(
      new Wallet({
        agency: '001',
        agency_id: '1',
        customer_id: '2',
        typeAccount: 'poupanca',
        balance: 0,
      }),
    ),
  };

  const extractRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
  };

  const suit = new SendingBalanceUseCase(walletRepository, extractRepository);

  return {
    walletRepository,
    extractRepository,
    suit,
  };
};

describe('sending balance use case tests units', () => {
  it('should possible sending balanace to other wallet', async () => {
    const { suit } = makeSuit();

    const input = {
      id: 'id',
      sendingValue: 50,
      key: 'idhfvbsodbvosdfb',
    };

    const extract = await suit.execute(input);
    expect(extract.type).toEqual('enviado');
    expect(extract.created_at).toBeDefined();
    expect(extract.description).toEqual('A sending of R$50,00');
    expect(extract.value).toEqual(50);
  });
});
