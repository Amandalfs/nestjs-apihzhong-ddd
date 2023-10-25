import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { CustomerRepositoryInterface } from '@/customer/domain/repositories/repository-customer';
import { Customer } from '@/customer/domain/entities/customer.entity';

@Injectable()
export class CustomerRepository implements CustomerRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  create(entity: Customer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(entity: Customer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  findByUsername(username: string): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  findByCpf(cpf: string): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }
}
