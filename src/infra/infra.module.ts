import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';
import { AuthUserRepository } from './auth-user/prisma.auth-user.repository';
import { CustomerRepositoryService } from './customer.repository/customer.repository.service';

@Module({
  providers: [PrismaService, AuthUserRepository, CustomerRepositoryService],
  exports: [AuthUserRepository, CustomerRepositoryService],
})
export class InfraModule {}
