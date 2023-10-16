import { RepositoryInterface } from 'src/@shared/repositories/repository.interface';
import { AuthUser } from '../domain/entities/authUser.entity';

export interface AuthUserRepositoryInterface
  extends RepositoryInterface<AuthUser> {}
