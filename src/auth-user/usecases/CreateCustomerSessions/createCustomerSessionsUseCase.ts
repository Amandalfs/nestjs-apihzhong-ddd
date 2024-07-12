import { AuthUserRepositoryInterface } from '@/auth-user/domain/repositories/authUserRepositoryInterface';
import {
  InputCreateCustomerSessionsUseCaseDto,
  OutputCreateCustomerSessionsUseCaseDto,
} from './createCustomerSessionsUseCase.dto';
import { JwtService } from '@nestjs/jwt';

export class CreateCustomerSessionsUseCase {
  constructor(
    private authUserRepositoryInterface: AuthUserRepositoryInterface,
    private jwt: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: InputCreateCustomerSessionsUseCaseDto): Promise<OutputCreateCustomerSessionsUseCaseDto> {
    const customerAlreadyExist =
      await this.authUserRepositoryInterface.findByEmail(email);

    if (!customerAlreadyExist) {
      throw new Error('The credentials are invalid.');
    }

    const isPasswordValid = customerAlreadyExist.checkPassword(password);

    const token = await this.jwt.signAsync({ sub: 'user-id' });

    if (!isPasswordValid) {
      throw new Error('The credentials are invalid.');
    }

    return {
      token,
    };
  }
}
