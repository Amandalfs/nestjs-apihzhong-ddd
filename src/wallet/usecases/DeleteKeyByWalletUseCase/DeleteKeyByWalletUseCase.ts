import { WalletRepositoryInterface } from './../../domain/wallet/repositories/walletRepository';
import {
  InputDeleteKeyByWalletUseCaseDto,
  OutputDeleteKeyByWalletUseCaseDto,
} from './DeleteKeyByWalletUseCase.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteKeyByWalletUseCase {
  constructor(private walletRepository: WalletRepositoryInterface) {}

  async execute({
    id,
    typeKey,
  }: InputDeleteKeyByWalletUseCaseDto): Promise<OutputDeleteKeyByWalletUseCaseDto> {
    const wallet = await this.walletRepository.findById(id);

    if (typeKey === 'email') {
      wallet.keys.deleteKeyEmail();
    }

    if (typeKey === 'random') {
      wallet.keys.deleteKeyRandom();
    }

    if (typeKey === 'cpf') {
      wallet.keys.deleteKeyCpf();
    }

    await this.walletRepository.update(wallet);

    return {
      keyCpf: wallet.keys.keyCpf,
      keyEmail: wallet.keys.keyEmail,
      keyRandom: wallet.keys.keyRandom,
    };
  }
}
