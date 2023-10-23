import { WalletRepositoryInterface } from './../../domain/wallet/repositories/walletRepository';
import {
  InputCreateKeyByWalletUseCaseDto,
  OutputCreateKeyByWalletUseCaseDto,
} from './CreateKeyByWalletUseCase.dto';
import { CustomerFacadeInterface } from './../../../customer/facade/customerFacade.interface';

export class CreateKeyByWalletUseCase {
  constructor(
    private walletRepository: WalletRepositoryInterface,
    private facadeCustomer: CustomerFacadeInterface,
  ) {}

  async execute({
    id,
    typeKey,
  }: InputCreateKeyByWalletUseCaseDto): Promise<OutputCreateKeyByWalletUseCaseDto> {
    const wallet = await this.walletRepository.findById(id);
    const customer = await this.facadeCustomer.findById(wallet.customerId);

    if (typeKey === 'email') {
      wallet.keys.addKeyEmail(customer.email);
    }

    if (typeKey === 'random') {
      wallet.keys.generateKeyRandom();
    }

    if (typeKey === 'cpf') {
      wallet.keys.addKeyCpf(customer.cpf);
    }

    await this.walletRepository.update(wallet);

    return {
      keyCpf: wallet.keys.keyCpf,
      keyEmail: wallet.keys.keyEmail,
      keyRandom: wallet.keys.keyRandom,
    };
  }
}
