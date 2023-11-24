import { CreateCustomerUseCase } from '@/customer/usecases/CreateCustomerUsecase/CreateCustomerUseCase';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../zod-validate/zod-validate.pipe';

const customerBodySchema = z.object({
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8).max(32),
  cpf: z.string().refine((value) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)),
});

type CustomerBodySchema = z.infer<typeof customerBodySchema>;

@Controller('/api-rest/customers')
export class CreateCustomerController {
  constructor(private createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(customerBodySchema))
  async create(@Body() customer: CustomerBodySchema) {
    const { cpf, email, name, password, username } = customer;
    await this.createCustomerUseCase.execute({
      cpf,
      email,
      name,
      password,
      username,
    });
    return 'customer created success';
  }
}
