import { InfraModule } from '@/infra/infra.module';
import { Module } from '@nestjs/common';
import { CreateAuthUserUseCase } from './usecases/CreateAuthUser/CreateAuthUserUseCase';
import { AuthUserFacade } from './facade/AuthUserFacade';
import { AuthUserFacadeInterface } from './facade/authUserFacade.interface';

@Module({
  imports: [InfraModule],
  providers: [CreateAuthUserUseCase, AuthUserFacade],
  exports: [
    CreateAuthUserUseCase,
    {
      provide: AuthUserFacadeInterface,
      useClass: AuthUserFacade,
    },
  ],
})
export class AuthUserModule {}
