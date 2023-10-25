import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { WalletModule } from './wallet/wallet.module';
import { InfraModule } from './infra/infra.module';
import { ConfigModule } from '@nestjs/config';
import { HttpsModule } from './https/https.module';

@Module({
  imports: [
    CustomerModule,
    AuthUserModule,
    WalletModule,
    InfraModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
