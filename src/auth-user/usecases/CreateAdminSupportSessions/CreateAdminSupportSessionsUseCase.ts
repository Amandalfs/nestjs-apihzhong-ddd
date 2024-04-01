import { AuthUserRepositoryInterface } from '@/auth-user/domain/repositories/authUserRepositoryInterface';
import {
  InputCreateAdminSupportSessionsUseCaseDto,
  OutputCreateAdminSupportSessionsUseCaseDto,
} from './CreateAdminSupportSessionsUseCase.dto';

export class CreateAdminSupportSessionsUseCase {
  constructor(
    private authUserRepositoryInterface: AuthUserRepositoryInterface,
  ) {}

  async execute({
    email,
    password,
  }: InputCreateAdminSupportSessionsUseCaseDto): Promise<OutputCreateAdminSupportSessionsUseCaseDto> {
    const adminSupportAlreadyExist =
      await this.authUserRepositoryInterface.findByEmail(email);

    if (!adminSupportAlreadyExist) {
      throw new Error('The credentials are invalid.');
    }

    const isPasswordValid = adminSupportAlreadyExist.checkPassword(password);

    if (!isPasswordValid) {
      throw new Error('The credentials are invalid.');
    }

    return {
      token: 'dvnsbvsobvspvn',
    };
  }
}
