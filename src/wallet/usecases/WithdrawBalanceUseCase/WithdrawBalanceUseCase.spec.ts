import { Wallet } from './../../domain/wallet/entities/wallet';
import { WalletRepositoryInterface } from './../../domain/wallet/repositories/walletRepository';
import { ExtractRepositoryInterface } from './../../domain/wallet/repositories/extractRepository';
import { WithdrawBalanceUseCase } from './WithdrawBalanceUseCase';

interface TypeSuit {
  walletRepository: WalletRepositoryInterface;
  extractRepository: ExtractRepositoryInterface;
  suit: WithdrawBalanceUseCase;
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
    findByKey: jest.fn(),
  };

  const extractRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
  };

  const suit = new WithdrawBalanceUseCase(walletRepository, extractRepository);

  return {
    walletRepository,
    extractRepository,
    suit,
  };
};

describe('withdraw balance use case tests units', () => {
  it('should possible withdraw balance', async () => {
    const { suit } = makeSuit();

    const input = {
      id: 'id',
      withdrawValue: 50,
    };

    const extract = await suit.execute(input);
    expect(extract.type).toEqual('saque');
    expect(extract.created_at).toBeDefined();
    expect(extract.description).toEqual('A withdraw of R$50,00');
    expect(extract.value).toEqual(50);
  });
});
