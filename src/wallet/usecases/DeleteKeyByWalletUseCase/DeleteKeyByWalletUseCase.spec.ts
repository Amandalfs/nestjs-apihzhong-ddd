import { WalletRepositoryInterface } from './../../domain/wallet/repositories/walletRepository';
import { Wallet } from './../../domain/wallet/entities/wallet';
import { Key } from '../../domain/wallet/entities/key.entity';
import { DeleteKeyByWalletUseCase } from './DeleteKeyByWalletUseCase';

interface TypeSuit {
  walletRepository: WalletRepositoryInterface;
  suit: DeleteKeyByWalletUseCase;
}

const makeSuit = (): TypeSuit => {
  const keys = new Key({
    keyCpf: '123.456.789-11',
    keyEmail: 'emaiL@email.com',
    keyRandom: 'udfbgvbnoduvpibdiofb',
  });
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
        keys,
      }),
    ),
    findAll: jest.fn(),
    findByKey: jest.fn(),
  };

  const suit = new DeleteKeyByWalletUseCase(walletRepository);

  return {
    walletRepository,
    suit,
  };
};

describe('delete key by wallet use case tests units', () => {
  it('should possible delete key by type email', async () => {
    const { suit } = makeSuit();

    const input = {
      id: 'id',
      typeKey: 'email',
    };

    const response = await suit.execute(input);
    expect(response.keyEmail).toBeNull();
  });

  it('should possible delete key by type cpf', async () => {
    const { suit } = makeSuit();

    const input = {
      id: 'id',
      typeKey: 'cpf',
    };

    const response = await suit.execute(input);
    expect(response.keyCpf).toBeNull();
  });

  it('should possible delete key by type random', async () => {
    const { suit } = makeSuit();

    const input = {
      id: 'id',
      typeKey: 'random',
    };

    const response = await suit.execute(input);
    expect(response.keyRandom).toBeNull();
  });
});
