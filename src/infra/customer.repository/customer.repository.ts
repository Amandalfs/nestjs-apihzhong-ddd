import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { CustomerRepositoryInterface } from '@/customer/domain/repositories/repository-customer';
import { Customer } from '@/customer/domain/entities/customer.entity';
import { MakeCustomer } from '@/customer/domain/factories/makeCustomer';

@Injectable()
export class CustomerRepository implements CustomerRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(entity: Customer): Promise<void> {
    await this.prisma.customer.create({
      data: {
        id: entity.id,
        cpf: entity.cpf.cpfFormatted,
        name: entity.name,
        username: entity.username,
        email: entity.email,
        active: entity.isActive(),
      },
    });
  }

  async update(entity: Customer): Promise<void> {
    await this.prisma.customer.update({
      data: {
        cpf: entity.cpf.cpfFormatted,
        name: entity.name,
        username: entity.username,
        email: entity.email,
        active: entity.isActive(),
      },
      where: {
        id: entity.id,
      },
    });
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
    return MakeCustomer.customerWithId({
      id: customer.id,
      cpf: customer.cpf,
      email: customer.email,
      name: customer.name,
      username: customer.username,
      active: customer.active,
    });
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        email,
      },
    });
    return customer
      ? MakeCustomer.customerWithId({
          id: customer.id,
          cpf: customer.cpf,
          email: customer.email,
          name: customer.name,
          username: customer.username,
          active: customer.active,
        })
      : null;
  }

  async findByUsername(username: string): Promise<Customer> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        username,
      },
    });
    return customer
      ? MakeCustomer.customerWithId({
          id: customer.id,
          cpf: customer.cpf,
          email: customer.email,
          name: customer.name,
          username: customer.username,
          active: customer.active,
        })
      : null;
  }

  async findByCpf(cpf: string): Promise<Customer> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        cpf,
      },
    });

    return customer
      ? MakeCustomer.customerWithId({
          id: customer.id,
          cpf: customer.cpf,
          email: customer.email,
          name: customer.name,
          username: customer.username,
          active: customer.active,
        })
      : null;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany();
    return customers
      ? customers.map((customer) =>
          MakeCustomer.customerWithId({
            id: customer.id,
            cpf: customer.cpf,
            email: customer.email,
            name: customer.name,
            username: customer.username,
            active: customer.active,
          }),
        )
      : null;
  }
}
