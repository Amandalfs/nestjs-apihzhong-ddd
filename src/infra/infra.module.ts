import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';
import { AuthUserRepository } from './auth-user/prisma.auth-user.repository';

@Module({
  providers: [PrismaService, AuthUserRepository],
  exports: [AuthUserRepository],
})
export class InfraModule {}
