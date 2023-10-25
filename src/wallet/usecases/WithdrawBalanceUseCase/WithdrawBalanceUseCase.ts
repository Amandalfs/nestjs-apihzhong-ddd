import { WalletRepositoryInterface } from './../../domain/wallet/repositories/walletRepository';
import { ExtractRepositoryInterface } from './../../domain/wallet/repositories/extractRepository';
import { Extract } from './../../domain/wallet/entities/extract.entity';
import {
  InputWithdrawBalanceUseCaseDto,
  OutputWithdrawBalanceUseCaseDto,
} from './WithdrawBalanceUseCase.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WithdrawBalanceUseCase {
  constructor(
    private walletRepository: WalletRepositoryInterface,
    private extractRepository: ExtractRepositoryInterface,
  ) {}

  async execute({
    id,
    withdrawValue,
  }: InputWithdrawBalanceUseCaseDto): Promise<OutputWithdrawBalanceUseCaseDto> {
    const wallet = await this.walletRepository.findById(id);

    wallet.limitWithdraw.checkLimit(withdrawValue);
    wallet.limitWithdrawByDaily.checkLimit(withdrawValue);
    wallet.limitWithdrawByDaily.addWithdraw(withdrawValue);
    wallet.withdraw(withdrawValue);

    const extract = new Extract({
      type: 'saque',
      created_at: new Date(),
      description: `A withdraw of R$${withdrawValue
        .toFixed(2)
        .replace('.', ',')}`,
      value: withdrawValue,
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
