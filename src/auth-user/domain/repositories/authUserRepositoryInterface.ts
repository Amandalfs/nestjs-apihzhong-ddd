import { RepositoryInterface } from 'src/@shared/repositories/repository.interface';
import { AuthUser } from '../entities/authUser.entity';

export interface AuthUserRepositoryInterface
  extends RepositoryInterface<AuthUser> {
  findByEmail(email: string): Promise<AuthUser>;
}
