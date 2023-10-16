import { Cpf } from '../value-objects/cpf.value-object';
import { Customer } from './customer.entity';
import { Email } from './../value-objects/email.value-object';

describe('customer entity tests units', () => {
  it('should create customer', () => {
    const cpf = new Cpf([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 1]);
    const email = new Email('test@test.com');
    const customer = new Customer({
      name: 'Customer 1',
      username: 'Customer',
      cpf,
      email,
    });

    expect(customer.name).toEqual('Customer 1');
    expect(customer.username).toEqual('Customer');
    expect(customer.isActive()).toEqual(false);
    expect(customer.id).toBeDefined();
    expect(customer.cpf.cpfFormatted).toEqual('123.456.789-11');
  });

  it('should be possible throw error with the mandatory name error.', () => {
    const cpf = new Cpf([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 1]);
    const email = new Email('test@test.com');
    expect(() => {
      new Customer({
        name: '',
        username: 'Customer',
        cpf,
        email,
      });
    }).toThrowError('name is mandatory');
  });

  it('should be possible throw error with the mandatory username error.', () => {
    const cpf = new Cpf([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 1]);
    const email = new Email('test@test.com');
    expect(() => {
      new Customer({
        name: 'customer',
        username: '',
        cpf,
        email,
      });
    }).toThrowError('username is mandatory');
  });

  it('should be possible throw error with the mandatory cpf error.', () => {
    const email = new Email('test@test.com');
    expect(() => {
      new Customer({
        name: 'customer',
        username: 'customer',
        cpf: null,
        email,
      });
    }).toThrowError('cpf is mandatory');
  });

  it('should be possible to change the email.', () => {
    const cpf = new Cpf([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 1]);
    const email = new Email('test@test.com');
    const customer = new Customer({
      name: 'Customer 1',
      username: 'Customer',
      cpf,
      email,
    });
    const emailChanged = new Email('test2@test.com');
    customer.changeEmail(emailChanged);
    expect(customer.email).toEqual('test2@test.com');
  });

  it('should be possible to change the name.', () => {
    const cpf = new Cpf([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 1]);
    const email = new Email('test@test.com');
    const customer = new Customer({
      name: 'Customer 1',
      username: 'Customer',
      cpf,
      email,
    });
    customer.changeName('Customer 2');
    expect(customer.name).toEqual('Customer 2');
  });

  it('should be possible to change the username.', () => {
    const cpf = new Cpf([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 1]);
    const email = new Email('test@test.com');
    const customer = new Customer({
      name: 'Customer 1',
      username: 'Customer',
      cpf,
      email,
    });
    customer.changeUsername('Customer 2');
    expect(customer.username).toEqual('Customer 2');
  });

  it('should activate a customer.', () => {
    const cpf = new Cpf([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 1]);
    const email = new Email('test@test.com');
    const customer = new Customer({
      name: 'Customer 1',
      username: 'Customer',
      cpf,
      email,
    });
    customer.activate();
    expect(customer.isActive()).toEqual(true);
  });
});
