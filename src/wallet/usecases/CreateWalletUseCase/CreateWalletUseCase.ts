import { WalletRepositoryInterface } from 'src/wallet/domain/wallet/repositories/walletRepository';
import {
  InputCreateWalletUseCaseDto,
  OutputCreateWalletUseCaseDto,
} from './CreateWalletUseCase.dto';
import { Wallet } from './../../domain/wallet/entities/wallet';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateWalletUseCase {
  constructor(private walletRepository: WalletRepositoryInterface) {}

  async execute(
    input: InputCreateWalletUseCaseDto,
  ): Promise<OutputCreateWalletUseCaseDto> {
    const wallet = new Wallet(input);
    await this.walletRepository.create(wallet);
    return {
      balance: wallet.balance,
      id: wallet.id,
      typeAccount: wallet.typeAccount,
    };
  }
}
