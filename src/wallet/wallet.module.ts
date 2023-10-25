import { Module } from '@nestjs/common';
import { CreateAgencyUseCase } from './usecases/CreateAgencyUseCase/CreateAgencyUseCase';

@Module({
  providers: [CreateAgencyUseCase],
  exports: [CreateAgencyUseCase],
})
export class WalletModule {}
