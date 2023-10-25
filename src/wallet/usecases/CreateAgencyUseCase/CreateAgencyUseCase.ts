import { Injectable } from '@nestjs/common';
import {
  InputCreateAgencyUseCaseDto,
  OutputCreateAgencyUseCaseDto,
} from './CreateAgencyUseCase.dto';
import { AgencyRepositoryInterface } from '../../domain/agency/repositories/agency.repository.interface';
import { Agency } from '../../domain/agency/entities/agency.entity';
import { DomainException } from '../../../@shared/errors/domain.exception';

@Injectable()
export class CreateAgencyUseCase {
  constructor(private agencyRepository: AgencyRepositoryInterface) {}

  async execute(
    input: InputCreateAgencyUseCaseDto,
  ): Promise<OutputCreateAgencyUseCaseDto> {
    const agencyNumberAlreadyExists = await this.agencyRepository.findByNumber(
      input.number,
    );

    if (agencyNumberAlreadyExists) {
      throw new DomainException('agency number exists.');
    }

    const agency = new Agency({
      name: input.name,
      number: input.number,
    });

    await this.agencyRepository.create(agency);

    return {
      id: agency.id,
      name: agency.name,
      number: agency.number,
    };
  }
}
