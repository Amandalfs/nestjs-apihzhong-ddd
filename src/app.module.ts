import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [CustomerModule, AuthUserModule, WalletModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
