import { InfraModule } from '@/infra/infra.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfraModule],
  providers: [],
  exports: [],
})
export class WalletModule {}
