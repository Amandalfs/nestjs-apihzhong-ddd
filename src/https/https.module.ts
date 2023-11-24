import { AuthUserModule } from '@/auth-user/auth-user.module';
import { CustomerModule } from '@/customer/customer.module';
import { WalletModule } from '@/wallet/wallet.module';
import { Module } from '@nestjs/common';
import { CreateCustomerController } from './create-customer/create-customer.controller';

@Module({
  imports: [AuthUserModule, CustomerModule, WalletModule],
  controllers: [CreateCustomerController],
})
export class HttpsModule {}
