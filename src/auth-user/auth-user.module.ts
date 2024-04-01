import { InfraModule } from '@/infra/infra.module';
import { Module } from '@nestjs/common';
import { CreateAuthUserUseCase } from './usecases/CreateAuthUser/CreateAuthUserUseCase';
import { AuthUserFacade } from './facade/AuthUserFacade';
import { AuthUserFacadeInterface } from './facade/authUserFacade.interface';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { CreateAdminSupportAgencyUseCase } from './usecases/CreateAdminSupportAgency/CreateAdminSupportAgencyUseCase';
import { CreateAdminSupportSessionsUseCase } from './usecases/CreateAdminSupportSessions/CreateAdminSupportSessionsUseCase';

@Module({
  imports: [
    InfraModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const privateKey = config.get('JWT_PRIVATE_KEY', {
          infer: true,
        }) as string;
        const publicKey = config.get('JWT_PUBLIC_KEY', {
          infer: true,
        }) as string;
        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  providers: [
    CreateAuthUserUseCase,
    CreateAdminSupportAgencyUseCase,
    CreateAdminSupportSessionsUseCase,
    {
      provide: AuthUserFacadeInterface,
      useClass: AuthUserFacade,
    },
  ],
  exports: [
    CreateAuthUserUseCase,
    AuthUserFacadeInterface,
    CreateAdminSupportAgencyUseCase,
    CreateAdminSupportSessionsUseCase,
  ],
})
export class AuthUserModule {}
