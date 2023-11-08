import { InfraModule } from '@/infra/infra.module';
import { Module } from '@nestjs/common';
import { CreateAgencyUseCase } from './usecases/CreateAgencyUseCase/CreateAgencyUseCase';
import { CreateWalletUseCase } from './usecases/CreateWalletUseCase/CreateWalletUseCase';
import { DepositBalanceUseCase } from './usecases/DepositBalanceUseCase/DepositBalanceUseCase';
import { SendingBalanceUseCase } from './usecases/SendingBalanceUseCase/SendingBalanceUseCase';
import { WithdrawBalanceUseCase } from './usecases/WithdrawBalanceUseCase/WithdrawBalanceUseCase';

@Module({
  imports: [InfraModule],
  providers: [
    CreateAgencyUseCase,
    CreateWalletUseCase,
    DepositBalanceUseCase,
    SendingBalanceUseCase,
    WithdrawBalanceUseCase,
  ],
  exports: [
    CreateAgencyUseCase,
    CreateWalletUseCase,
    DepositBalanceUseCase,
    SendingBalanceUseCase,
    WithdrawBalanceUseCase,
  ],
})
export class WalletModule {}
