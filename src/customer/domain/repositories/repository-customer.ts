import { Customer } from '../entities/customer.entity';
import { RepositoryInterface } from './../../../@shared/repositories/repository.interface';
export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
