import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';
import { AuthUserRepository } from './auth-user/prisma.auth-user.repository';
import { CustomerRepository } from './customer.repository/customer.repository';

@Module({
  providers: [PrismaService, AuthUserRepository, CustomerRepository],
  exports: [AuthUserRepository, CustomerRepository],
})
export class InfraModule {}
