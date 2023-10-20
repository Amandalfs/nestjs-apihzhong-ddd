import { MakeCustomer } from '../../domain/factories/makeCustomer';
import { CustomerRepositoryInterface } from '../../domain/repositories/repository-customer';
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from './CreateCustomerUseCase.dto';

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(
    input: InputCreateCustomerDto,
  ): Promise<OutputCreateCustomerDto> {
    const emailAlreadyExists = await this.customerRepository.findByEmail(
      input.email,
    );

    if (emailAlreadyExists) {
      throw new Error('A Customer with this email already exists.');
    }

    const usernameAlreadyExists = await this.customerRepository.findByUsername(
      input.username,
    );

    if (usernameAlreadyExists) {
      throw new Error('A Customer with this username already exists.');
    }

    const cpfAlreadyExists = await this.customerRepository.findByCpf(input.cpf);

    if (cpfAlreadyExists) {
      throw new Error('A Customer with this cpf already exists.');
    }

    const customer = MakeCustomer.customer({
      cpf: input.cpf,
      email: input.email,
      name: input.name,
      username: input.username,
    });

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      username: customer.username,
      email: customer.email,
      cpf: customer.cpf.cpfFormatted,
    };
  }
}
