import { AuthUserModule } from '@/auth-user/auth-user.module';
import { CustomerModule } from '@/customer/customer.module';
import { WalletModule } from '@/wallet/wallet.module';
import { Module } from '@nestjs/common';
import { CreateCustomerController } from './create-customer/create-customer.controller';
import { CreateAdminSupportAgencyController } from './create-admin-support-agency/create-admin-support-agency.controller';
import { CreateAgencyController } from './create-agency/create-agency.controller';

@Module({
  imports: [AuthUserModule, CustomerModule, WalletModule],
  controllers: [
    CreateCustomerController,
    CreateAdminSupportAgencyController,
    CreateAgencyController,
  ],
})
export class HttpsModule {}
