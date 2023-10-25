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

    expect(customerResponse?.cpf).toEqual(customer.cpf.cpfFormatted);
    expect(customerResponse?.active).toEqual(customer.isActive());
    expect(customerResponse?.email).toEqual(customer.email);
    expect(customerResponse?.username).toEqual(customer.username);
    expect(customerResponse.name).toEqual(customer.name);
  });
});
