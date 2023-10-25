import { Customer } from '../entities/customer.entity';
import { Cpf } from '../value-objects/cpf.value-object';
import { Email } from '../value-objects/email.value-object';

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
    const cpfNumbers = cpf
      .replaceAll('.', '')
      .replaceAll('-', '')
      .slice(0, 9)
      .split('')
      .map((number) => {
        return Number(number);
      });

    const cpfCheckDigits = cpf
      .replaceAll('.', '')
      .replaceAll('-', '')
      .slice(9, 11)
      .split('')
      .map((digit) => {
        return Number(digit);
      });

    const customer = new Customer(
      {
        name,
        username,
        cpf: new Cpf(cpfNumbers, cpfCheckDigits),
        email: new Email(email),
        active,
      },
      id,
    );
    return customer;
  }

  static customer({ cpf, email, name, username }: InputMakeCustomerDTO) {
    const cpfNumbers = cpf
      .replaceAll('.', '')
      .replaceAll('-', '')
      .slice(0, 9)
      .split('')
      .map((number) => {
        return Number(number);
      });

    const cpfCheckDigits = cpf
      .replaceAll('.', '')
      .replaceAll('-', '')
      .slice(9, 11)
      .split('')
      .map((digit) => {
        return Number(digit);
      });

    const customer = new Customer({
      name,
      username,
      cpf: new Cpf(cpfNumbers, cpfCheckDigits),
      email: new Email(email),
    });
    return customer;
  }
}
