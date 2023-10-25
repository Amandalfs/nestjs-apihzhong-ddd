import { InfraModule } from '@/infra/infra.module';
import { Module } from '@nestjs/common';
import { CreateAuthUserUseCase } from './usecases/CreateAuthUser/CreateAuthUserUseCase';

@Module({
  imports: [InfraModule],
  providers: [CreateAuthUserUseCase],
  exports: [CreateAuthUserUseCase],
})
export class AuthUserModule {}
