import { AgencyRepositoryInterface } from '../../domain/agency/repositories/agency.repository.interface';
import { Agency } from '../../domain/agency/entities/agency.entity';
import { CreateAgencyUseCase } from './CreateAgencyUseCase';

interface TypeSuit {
  agencyRepository: AgencyRepositoryInterface;
  suit: CreateAgencyUseCase;
}

const makeSuit = (): TypeSuit => {
  const agencyRepository: AgencyRepositoryInterface = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findByNumber: jest.fn(),
    findAll: jest.fn(),
  };

  const suit = new CreateAgencyUseCase(agencyRepository);

  return {
    agencyRepository,
    suit,
  };
};

describe('create agency use case tests units', () => {
  it('should create agency', async () => {
    const { suit } = makeSuit();

    const input = {
      name: 'agency 1',
      number: '001',
    };

    const response = await suit.execute(input);

    expect(response.id).toBeDefined();
    expect(response.name).toEqual(input.name);
    expect(response.number).toEqual(input.number);
  });

  it('should possible throw error if number exists', async () => {
    const { suit, agencyRepository } = makeSuit();

    jest.spyOn(agencyRepository, 'findByNumber').mockResolvedValue(
      new Agency({
        name: 'agency 1',
        number: '001',
      }),
    );

    const input = {
      name: 'agency 1',
      number: '001',
    };

    expect(async () => {
      await suit.execute(input);
    }).rejects.toThrow();
  });
});
