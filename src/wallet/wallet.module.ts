import { Module } from '@nestjs/common';
import { CreateAgencyUseCase } from './usecases/CreateAgencyUseCase/CreateAgencyUseCase';
import { CreateWalletUseCase } from './usecases/CreateWalletUseCase/CreateWalletUseCase';
import { DeleteKeyByWalletUseCase } from './usecases/DeleteKeyByWalletUseCase/DeleteKeyByWalletUseCase';
import { DepositBalanceUseCase } from './usecases/DepositBalanceUseCase/DepositBalanceUseCase';
import { SendingBalanceUseCase } from './usecases/SendingBalanceUseCase/SendingBalanceUseCase';
import { WithdrawBalanceUseCase } from './usecases/WithdrawBalanceUseCase/WithdrawBalanceUseCase';

@Module({
  providers: [
    CreateAgencyUseCase,
    CreateWalletUseCase,
    DeleteKeyByWalletUseCase,
    DepositBalanceUseCase,
    SendingBalanceUseCase,
    WithdrawBalanceUseCase,
  ],
  exports: [
    CreateAgencyUseCase,
    CreateWalletUseCase,
    DeleteKeyByWalletUseCase,
    DepositBalanceUseCase,
    SendingBalanceUseCase,
    WithdrawBalanceUseCase,
  ],
})
export class WalletModule {}
