import { AuthUser } from '../../domain/entities/authUser.entity';
import { AuthUserRepositoryInterface } from '../../domain/repositories/authUserRepositoryInterface';
import { Injectable } from '@nestjs/common';
import {
  InputCreateAdminSupportAgencyUseCaseDto,
  OutputCreateAdminSupportAgencyUseCaseDto,
} from './CreateAdminSupportAgencyUseCase.dto';

@Injectable()
export class CreateAdminSupportAgencyUseCase {
  constructor(private authUserRepository: AuthUserRepositoryInterface) {}

  async execute(
    input: InputCreateAdminSupportAgencyUseCaseDto,
  ): Promise<OutputCreateAdminSupportAgencyUseCaseDto> {
    const emailAlreadyExists = await this.authUserRepository.findByEmail(
      input.email,
    );

    if (emailAlreadyExists) {
      throw new Error('A Admin agency with this email already exists.');
    }

    const authUser = new AuthUser({
      email: input.email,
      password: input.password,
      hash: true,
      rule: 'adminSuport',
    });

    await this.authUserRepository.create(authUser);

    return {
      email: authUser.email,
      id: authUser.id,
    };
  }
}
