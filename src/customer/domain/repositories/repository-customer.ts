import { Customer } from '../entities/customer.entity';
import { RepositoryInterface } from './../../../@shared/repositories/repository.interface';
export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {
  findByEmail(email: string): Promise<Customer>;
  findByUsername(username: string): Promise<Customer>;
  findByCpf(cpf: string): Promise<Customer>;
}
