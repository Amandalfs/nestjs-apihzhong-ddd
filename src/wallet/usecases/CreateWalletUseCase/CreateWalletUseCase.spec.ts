import { WalletRepositoryInterface } from './../../domain/wallet/repositories/walletRepository';
import { CreateWalletUseCase } from './CreateWalletUseCase';
import { InputCreateWalletUseCaseDto } from './CreateWalletUseCase.dto';

interface TypeSuit {
  walletRepository: WalletRepositoryInterface;
  suit: CreateWalletUseCase;
}

const makeSuit = (): TypeSuit => {
  const walletRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    findByKey: jest.fn(),
  };

  const suit = new CreateWalletUseCase(walletRepository);

  return {
    walletRepository,
    suit,
  };
};

describe('create wallet use case tests units', () => {
  it('should create wallet', async () => {
    const { suit } = makeSuit();
    const input: InputCreateWalletUseCaseDto = {
      agency: '001',
      agency_id: 'id',
      typeAccount: 'poupanca',
      customer_id: 'id',
    };
    const wallet = await suit.execute(input);
    expect(wallet.id).toBeDefined();
    expect(wallet.balance).toEqual(0);
    expect(wallet.typeAccount).toEqual(input.typeAccount);
  });
});
