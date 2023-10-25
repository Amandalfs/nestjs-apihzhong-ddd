import { AuthUserModule } from '@/auth-user/auth-user.module';
import { CustomerModule } from '@/customer/customer.module';
import { WalletModule } from '@/wallet/wallet.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthUserModule, CustomerModule, WalletModule],
})
export class HttpsModule {}
