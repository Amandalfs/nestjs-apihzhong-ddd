import { InfraModule } from '@/infra/infra.module';
import { Module } from '@nestjs/common';
import { CreateAgencyUseCase } from './usecases/CreateAgencyUseCase/CreateAgencyUseCase';
import { CreateWalletUseCase } from './usecases/CreateWalletUseCase/CreateWalletUseCase';
import { DepositBalanceUseCase } from './usecases/DepositBalanceUseCase/DepositBalanceUseCase';
import { SendingBalanceUseCase } from './usecases/SendingBalanceUseCase/SendingBalanceUseCase';
import { WithdrawBalanceUseCase } from './usecases/WithdrawBalanceUseCase/WithdrawBalanceUseCase';
import { CustomerModule } from '@/customer/customer.module';
import { CreateKeyByWalletUseCase } from './usecases/CreateKeyByWalletUseCase/CreateKeyByWalletUseCase';
import { DeleteKeyByWalletUseCase } from './usecases/DeleteKeyByWalletUseCase/DeleteKeyByWalletUseCase';

@Module({
  imports: [InfraModule, CustomerModule],
  providers: [
    CreateAgencyUseCase,
    CreateWalletUseCase,
    DepositBalanceUseCase,
    SendingBalanceUseCase,
    WithdrawBalanceUseCase,
    CreateKeyByWalletUseCase,
    DeleteKeyByWalletUseCase,
  ],
  exports: [
    CreateAgencyUseCase,
    CreateWalletUseCase,
    DepositBalanceUseCase,
    SendingBalanceUseCase,
    WithdrawBalanceUseCase,
    CreateKeyByWalletUseCase,
    DeleteKeyByWalletUseCase,
  ],
})
export class WalletModule {}
