import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AuthUserModule } from './auth-user/auth-user.module';

@Module({
  imports: [CustomerModule, AuthUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
