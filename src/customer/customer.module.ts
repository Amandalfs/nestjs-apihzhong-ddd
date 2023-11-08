import { InfraModule } from '@/infra/infra.module';
import { Module } from '@nestjs/common';
import { ActivateCustomerUseCase } from './usecases/ActivateCustomerUsecase/ActivateCustomerUseCase';
import { FindCustomerUseCase } from './usecases/FindCustomerUsecase/FindCustomerUseCase';
import { CreateCustomerUseCase } from './usecases/CreateCustomerUsecase/CreateCustomerUseCase';
import { CustomerFacadeInterface } from './facade/customerFacade.interface';
import { CustomerFacade } from './facade/customerFacade';

@Module({
  imports: [InfraModule],
  providers: [
    ActivateCustomerUseCase,
    CreateCustomerUseCase,
    FindCustomerUseCase,
    {
      provide: CustomerFacadeInterface,
      useClass: CustomerFacade,
    },
  ],
  exports: [
    ActivateCustomerUseCase,
    CreateCustomerUseCase,
    FindCustomerUseCase,
    CustomerFacadeInterface,
  ],
})
export class CustomerModule {}
