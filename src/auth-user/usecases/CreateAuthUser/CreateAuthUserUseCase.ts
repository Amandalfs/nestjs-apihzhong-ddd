import { AuthUser } from '../../domain/entities/authUser.entity';
import { AuthUserRepositoryInterface } from '../../domain/repositories/authUserRepositoryInterface';
import {
  InputCreateAuthUserUseCaseDto,
  OutputCreateAuthUserUseCaseDto,
} from './CreateAuthUserUseCase.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAuthUserUseCase {
  constructor(private authUserRepository: AuthUserRepositoryInterface) {}

  async execute(
    input: InputCreateAuthUserUseCaseDto,
  ): Promise<OutputCreateAuthUserUseCaseDto> {
    const emailAlreadyExists = await this.authUserRepository.findByEmail(
      input.email,
    );

    if (emailAlreadyExists) {
      throw new Error('A Auth User with this email already exists.');
    }

    const authUser = new AuthUser({
      email: input.email,
      password: input.password,
      customerId: input.customerId,
      hash: true,
    });

    await this.authUserRepository.create(authUser);

    return {
      email: authUser.email,
      id: authUser.id,
    };
  }
}
