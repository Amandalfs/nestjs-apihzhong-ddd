import { InfraModule } from '@/infra/infra.module';
import { Module } from '@nestjs/common';
import { CreateAuthUserUseCase } from './usecases/CreateAuthUser/CreateAuthUserUseCase';
import { AuthUserFacade } from './facade/AuthUserFacade';
import { AuthUserFacadeInterface } from './facade/authUserFacade.interface';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

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
    {
      provide: AuthUserFacadeInterface,
      useClass: AuthUserFacade,
    },
  ],
  exports: [CreateAuthUserUseCase, AuthUserFacadeInterface],
})
export class AuthUserModule {}
