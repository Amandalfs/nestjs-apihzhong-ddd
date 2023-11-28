import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { z } from 'zod';
import { ZodValidationPipe } from '../zod-validate/zod-validate.pipe';
import { CreateAgencyUseCase } from './../../wallet/usecases/CreateAgencyUseCase/CreateAgencyUseCase';

const agencyBodySchema = z.object({
  number: z.string(),
  name: z.string(),
});

type AgencyBodySchema = z.infer<typeof agencyBodySchema>;

@Controller('/api-rest/agency')
export class CreateAgencyController {
  constructor(private createAgencyUseCase: CreateAgencyUseCase) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(agencyBodySchema))
  async create(@Body() agency: AgencyBodySchema) {
    const { name, number } = agency;
    await this.createAgencyUseCase.execute({
      name,
      number,
    });
    return 'created agency success';
  }
}
