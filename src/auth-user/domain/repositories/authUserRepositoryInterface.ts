import { RepositoryInterface } from 'src/@shared/repositories/repository.interface';
import { AuthUser } from '../entities/authUser.entity';

export abstract class AuthUserRepositoryInterface extends RepositoryInterface<AuthUser> {
  abstract findByEmail(email: string): Promise<AuthUser>;
}
