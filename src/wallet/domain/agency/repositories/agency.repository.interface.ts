import { RepositoryInterface } from '../../../../@shared/repositories/repository.interface';
import { Agency } from '../../agency/entities/agency.entity';

export abstract class AgencyRepositoryInterface extends RepositoryInterface<Agency> {
  abstract findByNumber(number: string): Promise<Agency>;
}
