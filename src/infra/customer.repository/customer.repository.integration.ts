import { PrismaService } from '../prisma-service/prisma.service';
import { execSync } from 'child_process';
import { CustomerRepository } from './customer.repository';
import { MakeCustomer } from './../../customer/domain/factories/makeCustomer';

describe('auth user repository intregation tests', () => {
  const prisma = new PrismaService();
  const customerRepository = new CustomerRepository(prisma);

  beforeEach(async () => {
    execSync('npx prisma migrate deploy');
  });

  afterEach(async () => {
    execSync('npx prisma migrate reset --force');
  });

  it('should create customer', async () => {
    const customer = MakeCustomer.customer({
      cpf: '123.456.789-11',
      email: 'email@emai.com',
      name: 'test1',
      username: 'test1',
    });

    await customerRepository.create(customer);

    const customerResponse = await prisma.customer.findFirst({
      where: {
        id: customer.id,
      },
    });

    expect(customerResponse.cpf).toEqual(customer.cpf.cpfFormatted);
    expect(customerResponse.active).toEqual(customer.isActive());
    expect(customerResponse.email).toEqual(customer.email);
    expect(customerResponse.username).toEqual(customer.username);
    expect(customerResponse.name).toEqual(customer.name);
  });

  it('should update customer', async () => {
    const customer = MakeCustomer.customer({
      cpf: '123.456.789-11',
      email: 'email@emai.com',
      name: 'test1',
      username: 'test1',
    });

    await prisma.customer.create({
      data: {
        id: customer.id,
        email: customer.email,
        cpf: customer.cpf.cpfFormatted,
        username: customer.username,
        name: customer.name,
        active: customer.isActive(),
      },
    });

    customer.changeName('test2');
    customer.changeUsername('username2');
    await customerRepository.update(customer);

    const customerResponse = await prisma.customer.findFirst({
      where: {
        id: customer.id,
      },
    });

    expect(customerResponse.cpf).toEqual(customer.cpf.cpfFormatted);
    expect(customerResponse.active).toEqual(customer.isActive());
    expect(customerResponse.email).toEqual(customer.email);
    expect(customerResponse.username).toEqual(customer.username);
    expect(customerResponse.name).toEqual(customer.name);
  });

  it('should find customer by id', async () => {
    const customer = MakeCustomer.customer({
      cpf: '123.456.789-11',
      email: 'email@emai.com',
      name: 'test1',
      username: 'test1',
    });

    await prisma.customer.create({
      data: {
        id: customer.id,
        email: customer.email,
        cpf: customer.cpf.cpfFormatted,
        username: customer.username,
        name: customer.name,
        active: customer.isActive(),
      },
    });

    const customerResponse = await customerRepository.findById(customer.id);

    expect(customerResponse.cpf).toEqual(customer.cpf);
    expect(customerResponse.isActive()).toEqual(customer.isActive());
    expect(customerResponse.email).toEqual(customer.email);
    expect(customerResponse.username).toEqual(customer.username);
    expect(customerResponse.name).toEqual(customer.name);
  });

  it('should find customer by email', async () => {
    const customer = MakeCustomer.customer({
      cpf: '123.456.789-11',
      email: 'email@emai.com',
      name: 'test1',
      username: 'test1',
    });

    await prisma.customer.create({
      data: {
        id: customer.id,
        email: customer.email,
        cpf: customer.cpf.cpfFormatted,
        username: customer.username,
        name: customer.name,
        active: customer.isActive(),
      },
    });

    const customerResponse = await customerRepository.findByEmail(
      customer.email,
    );

    expect(customerResponse.cpf).toEqual(customer.cpf);
    expect(customerResponse.isActive()).toEqual(customer.isActive());
    expect(customerResponse.email).toEqual(customer.email);
    expect(customerResponse.username).toEqual(customer.username);
    expect(customerResponse.name).toEqual(customer.name);
  });

  it('should find customer by username', async () => {
    const customer = MakeCustomer.customer({
      cpf: '123.456.789-11',
      email: 'email@emai.com',
      name: 'test1',
      username: 'test1',
    });

    await prisma.customer.create({
      data: {
        id: customer.id,
        email: customer.email,
        cpf: customer.cpf.cpfFormatted,
        username: customer.username,
        name: customer.name,
        active: customer.isActive(),
      },
    });

    const customerResponse = await customerRepository.findByUsername(
      customer.username,
    );

    expect(customerResponse.cpf).toEqual(customer.cpf);
    expect(customerResponse.isActive()).toEqual(customer.isActive());
    expect(customerResponse.email).toEqual(customer.email);
    expect(customerResponse.username).toEqual(customer.username);
    expect(customerResponse.name).toEqual(customer.name);
  });

  it('should findAll Customers', async () => {
    const customer = MakeCustomer.customer({
      cpf: '123.456.789-11',
      email: 'email@emai.com',
      name: 'test1',
      username: 'test1',
    });

    const customer2 = MakeCustomer.customer({
      cpf: '123.456.789-12',
      email: 'email2@emai.com',
      name: 'test2',
      username: 'test2',
    });

    await prisma.customer.create({
      data: {
        id: customer.id,
        email: customer.email,
        cpf: customer.cpf.cpfFormatted,
        username: customer.username,
        name: customer.name,
        active: customer.isActive(),
      },
    });

    await prisma.customer.create({
      data: {
        id: customer2.id,
        email: customer2.email,
        cpf: customer2.cpf.cpfFormatted,
        username: customer2.username,
        name: customer2.name,
        active: customer2.isActive(),
      },
    });

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
  });
});
