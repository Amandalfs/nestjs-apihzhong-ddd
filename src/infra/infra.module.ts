import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';
import { AuthUserRepository } from './auth-user/prisma.auth-user.repository';
import { CustomerRepository } from './customer.repository/customer.repository';
import { AuthUserRepositoryInterface } from '@/auth-user/domain/repositories/authUserRepositoryInterface';
import { CustomerRepositoryInterface } from '@/customer/domain/repositories/repository-customer';

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
  ],
  exports: [AuthUserRepositoryInterface, CustomerRepositoryInterface],
})
export class InfraModule {}
