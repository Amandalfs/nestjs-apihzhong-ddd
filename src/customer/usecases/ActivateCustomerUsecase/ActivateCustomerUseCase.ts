import { CustomerRepositoryInterface } from './../../domain/repositories/repository-customer';
import {
  InputActivateCustomerUseCaseDto,
  OutputActivateCustomerUseCaseDto,
} from './ActivateCustomerUseCase.dto';

export class ActivateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(
    input: InputActivateCustomerUseCaseDto,
  ): Promise<OutputActivateCustomerUseCaseDto> {
    const customer = await this.customerRepository.findById(input.id);
    customer.activate();
    await this.customerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
    };
  }
}
