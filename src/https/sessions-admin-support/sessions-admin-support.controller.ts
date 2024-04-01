import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../zod-validate/zod-validate.pipe';
import { CreateAdminSupportSessionsUseCase } from './../../auth-user/usecases/CreateAdminSupportSessions/CreateAdminSupportSessionsUseCase';

const sessionsAdminSupportBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

type SessionsAdminSupportBodySchema = z.infer<
  typeof sessionsAdminSupportBodySchema
>;

@Controller('/api-rest/agency/sessions')
export class SessionsAdminSupportController {
  constructor(
    private createAdminSupportSessionsUseCase: CreateAdminSupportSessionsUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(sessionsAdminSupportBodySchema))
  async create(@Body() adminSupport: SessionsAdminSupportBodySchema) {
    const { email, password } = adminSupport;
    const { token } = await this.createAdminSupportSessionsUseCase.execute({
      email,
      password,
    });
    return { token };
  }
}
