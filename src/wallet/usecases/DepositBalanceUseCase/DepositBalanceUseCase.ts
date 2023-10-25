import { WalletRepositoryInterface } from './../../domain/wallet/repositories/walletRepository';
import {
  InputDepositBalanceUseCaseDto,
  OutputDepositBalanceUseCaseDto,
} from './DepositBalanceUseCase.dto';
import { Extract } from './../../domain/wallet/entities/extract.entity';
import { ExtractRepositoryInterface } from './../../domain/wallet/repositories/extractRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepositBalanceUseCase {
  constructor(
    private walletRepository: WalletRepositoryInterface,
    private extractRepository: ExtractRepositoryInterface,
  ) {}

  async execute({
    depositValue,
    id,
  }: InputDepositBalanceUseCaseDto): Promise<OutputDepositBalanceUseCaseDto> {
    const wallet = await this.walletRepository.findById(id);
    wallet.deposit(depositValue);
    const extract = new Extract({
      created_at: new Date(),
      description: `A deposit of R$${depositValue
        .toFixed(2)
        .replace('.', ',')}`,
      type: 'deposito',
      value: depositValue,
      wallet_id: wallet.id,
    });

    await this.walletRepository.update(wallet);
    await this.extractRepository.create(extract);

    return {
      type: extract.type,
      created_at: extract.created_at,
      description: extract.description,
      value: extract.value,
    };
  }
}
