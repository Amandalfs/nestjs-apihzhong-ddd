import { Customer } from '../entities/customer.entity';
import { RepositoryInterface } from './../../../@shared/repositories/repository.interface';
export abstract class CustomerRepositoryInterface extends RepositoryInterface<Customer> {
  abstract findByEmail(email: string): Promise<Customer>;
  abstract findByUsername(username: string): Promise<Customer>;
  abstract findByCpf(cpf: string): Promise<Customer>;
}
