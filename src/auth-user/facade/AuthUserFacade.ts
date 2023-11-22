import { Injectable } from '@nestjs/common';
import { AuthUserFacadeInterface } from './authUserFacade.interface';
import { CreateAuthUserUseCase } from './../usecases/CreateAuthUser/CreateAuthUserUseCase';

@Injectable()
export class AuthUserFacade implements AuthUserFacadeInterface {
  constructor(private createAuthUserUseCase: CreateAuthUserUseCase) {}

  async createUserAuth({
    customerId,
    email,
    password,
  }: {
    customerId: string;
    email: string;
    password: string;
  }): Promise<void> {
    await this.createAuthUserUseCase.execute({
      customerId,
      email,
      password,
    });
  }
}
