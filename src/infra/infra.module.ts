import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';
import { AuthUserRepository } from './auth-user/prisma.auth-user.repository';
import { CustomerRepository } from './customer.repository/customer.repository';
import { AuthUserRepositoryInterface } from '@/auth-user/domain/repositories/authUserRepositoryInterface';
import { CustomerRepositoryInterface } from '@/customer/domain/repositories/repository-customer';
import { AgencyRepository } from './agency.repository/agency.repository';
import { AgencyRepositoryInterface } from '@/wallet/domain/agency/repositories/agency.repository.interface';
import { WalletRepository } from './wallet.repository/wallet.repository';
import { WalletRepositoryInterface } from '@/wallet/domain/wallet/repositories/walletRepository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: AuthUserRepositoryInterface,
      useClass: AuthUserRepository,
    },
    {
      provide: CustomerRepositoryInterface,
      useClass: CustomerRepository,
    },
    {
      provide: AgencyRepositoryInterface,
      useClass: AgencyRepository,
    },
    {
      provide: WalletRepositoryInterface,
      useClass: WalletRepository,
    },
  ],
  exports: [
    AuthUserRepositoryInterface,
    AgencyRepositoryInterface,
    WalletRepositoryInterface,
    CustomerRepositoryInterface,
  ],
})
export class InfraModule {}
