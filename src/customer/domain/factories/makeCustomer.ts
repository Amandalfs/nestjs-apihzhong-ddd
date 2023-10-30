import { Customer } from '../entities/customer.entity';
import { Email } from '../value-objects/email.value-object';
import { MakeCpf } from './makeCpf';

interface InputMakeCustomerDTO {
  cpf: string;
  email: string;
  name: string;
  username: string;
}

interface InputMakeCustomerWithIdDTO {
  id: string;
  cpf: string;
  email: string;
  name: string;
  username: string;
  active?: boolean;
}

export class MakeCustomer {
  static customerWithId({
    cpf,
    email,
    name,
    username,
    id,
    active,
  }: InputMakeCustomerWithIdDTO) {
    const customer = new Customer(
      {
        name,
        username,
        cpf: MakeCpf.transformCpfByObjectValue({ cpf }),
        email: new Email(email),
        active,
      },
      id,
    );
    return customer;
  }

  static customer({ cpf, email, name, username }: InputMakeCustomerDTO) {
    const customer = new Customer({
      name,
      username,
      cpf: MakeCpf.transformCpfByObjectValue({ cpf }),
      email: new Email(email),
    });
    return customer;
  }
}
