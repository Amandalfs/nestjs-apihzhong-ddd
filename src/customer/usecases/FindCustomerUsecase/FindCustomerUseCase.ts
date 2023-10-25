import { CustomerRepositoryInterface } from '../../domain/repositories/repository-customer';
import {
  InputFindCustomerUseCaseDto,
  OutputFindCustomerUseCaeDto,
} from './FindCustomerUseCase.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(
    input: InputFindCustomerUseCaseDto,
  ): Promise<OutputFindCustomerUseCaeDto> {
    const customer = await this.customerRepository.findById(input.id);

    return {
      id: customer.id,
      name: customer.name,
      username: customer.username,
    };
  }
}
