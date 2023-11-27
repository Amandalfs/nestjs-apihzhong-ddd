import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { z } from 'zod';
import { ZodValidationPipe } from '../zod-validate/zod-validate.pipe';
import { CreateAdminSupportAgencyUseCase } from '@/auth-user/usecases/CreateAdminSupportAgency/CreateAdminSupportAgencyUseCase';

const userAdminBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

type UserAdminBodySchema = z.infer<typeof userAdminBodySchema>;

@Controller('/api-rest/agency')
export class CreateAdminSupportAgencyController {
  constructor(
    private createAdminSupportAgencyUseCase: CreateAdminSupportAgencyUseCase,
  ) {}

  @Post('/create_admin')
  @UsePipes(new ZodValidationPipe(userAdminBodySchema))
  async create(@Body() userAdmin: UserAdminBodySchema) {
    const { email, password } = userAdmin;
    await this.createAdminSupportAgencyUseCase.execute({
      email,
      password,
    });
    return 'created user support agency admin success';
  }
}
