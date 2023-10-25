import { ExtractRepositoryInterface } from './../../domain/wallet/repositories/extractRepository';
import { WalletRepositoryInterface } from './../../domain/wallet/repositories/walletRepository';
import {
  InputSendingBalanceUseCaseDto,
  OutputSendingBalanceUseCaseDto,
} from './SendingBalanceUseCase.dto';
import { Extract } from './../../domain/wallet/entities/extract.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendingBalanceUseCase {
  constructor(
    private walletRepository: WalletRepositoryInterface,
    private extractRepository: ExtractRepositoryInterface,
  ) {}

  async execute({
    id,
    key,
    sendingValue,
  }: InputSendingBalanceUseCaseDto): Promise<OutputSendingBalanceUseCaseDto> {
    const wallet = await this.walletRepository.findById(id);
    const walletReceived = await this.walletRepository.findByKey(key);

    if (!walletReceived) {
      throw new Error('not found');
    }

    wallet.limitSending.checkLimit(sendingValue);
    wallet.limitSendingByDaily.checkLimit(sendingValue);
    wallet.limitSendingByDaily.addSending(sendingValue);
    wallet.withdraw(sendingValue);
    walletReceived.deposit(sendingValue);

    const extract = new Extract({
      created_at: new Date(),
      description: `A sending of R$${sendingValue
        .toFixed(2)
        .replace('.', ',')}`,
      type: 'enviado',
      value: sendingValue,
      wallet_id: wallet.id,
    });

    const extractReceive = new Extract({
      created_at: new Date(),
      description: `A receive of R$${sendingValue
        .toFixed(2)
        .replace('.', ',')}`,
      type: 'recebido',
      value: sendingValue,
      wallet_id: walletReceived.id,
    });

    await this.walletRepository.update(wallet);
    await this.walletRepository.update(walletReceived);

    await this.extractRepository.create(extract);
    await this.extractRepository.create(extractReceive);

    return {
      type: extract.type,
      created_at: extract.created_at,
      description: extract.description,
      value: extract.value,
    };
  }
}
