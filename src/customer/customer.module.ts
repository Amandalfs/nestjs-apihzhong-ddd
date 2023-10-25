import { InfraModule } from '@/infra/infra.module';
import { Module } from '@nestjs/common';
import { ActivateCustomerUseCase } from './usecases/ActivateCustomerUsecase/ActivateCustomerUseCase';
import { FindCustomerUseCase } from './usecases/FindCustomerUsecase/FindCustomerUseCase';
import { CreateCustomerUseCase } from './usecases/CreateCustomerUsecase/CreateCustomerUseCase';

@Module({
  imports: [InfraModule],
  providers: [
    ActivateCustomerUseCase,
    CreateCustomerUseCase,
    FindCustomerUseCase,
  ],
  exports: [
    ActivateCustomerUseCase,
    CreateCustomerUseCase,
    FindCustomerUseCase,
  ],
})
export class CustomerModule {}
