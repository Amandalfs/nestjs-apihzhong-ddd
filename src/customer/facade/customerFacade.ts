import { Injectable } from '@nestjs/common';
import {
  CustomerFacadeInterface,
  OutputfindByIdFacadeDto,
} from './customerFacade.interface';
import { FindCustomerUseCase } from './../usecases/FindCustomerUsecase/FindCustomerUseCase';

@Injectable()
export class CustomerFacade implements CustomerFacadeInterface {
  constructor(private findCustomerUseCase: FindCustomerUseCase) {}

  async findById(id: string): Promise<OutputfindByIdFacadeDto> {
    const customer = await this.findCustomerUseCase.execute({ id });
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf,
    };
  }
}
