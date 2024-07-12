import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../zod-validate/zod-validate.pipe';
import { CreateCustomerSessionsUseCase } from '@/auth-user/usecases/CreateCustomerSessions/createCustomerSessionsUseCase';

const sessionsCustomerBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

type SessionsCustomerBodySchema = z.infer<typeof sessionsCustomerBodySchema>;

@Controller('/api-rest/agency/sessions')
export class SessionsCustomerController {
  constructor(
    private createCustomerSessionsUseCase: CreateCustomerSessionsUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(sessionsCustomerBodySchema))
  async create(@Body() customer: SessionsCustomerBodySchema) {
    const { email, password } = customer;
    const { token } = await this.createCustomerSessionsUseCase.execute({
      email,
      password,
    });
    return { token };
  }
}
