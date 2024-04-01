import { AuthUserRepositoryInterface } from '@/auth-user/domain/repositories/authUserRepositoryInterface';
import {
  InputCreateAdminSupportSessionsUseCaseDto,
  OutputCreateAdminSupportSessionsUseCaseDto,
} from './CreateAdminSupportSessionsUseCase.dto';
import { JwtService } from '@nestjs/jwt';

export class CreateAdminSupportSessionsUseCase {
  constructor(
    private authUserRepositoryInterface: AuthUserRepositoryInterface,
    private jwt: JwtService,
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

    const token = await this.jwt.signAsync({ sub: 'user-id' });

    if (!isPasswordValid) {
      throw new Error('The credentials are invalid.');
    }

    return {
      token,
    };
  }
}
