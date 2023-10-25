import { execSync } from 'child_process';
import { AgencyRepository } from './agency.repository';
import { PrismaService } from '../prisma-service/prisma.service';
import { Agency } from '@/wallet/domain/agency/entities/agency.entity';

describe('agency repository integration tests', () => {
  const prisma = new PrismaService();
  const agencyRepository = new AgencyRepository(prisma);

  beforeEach(async () => {
    execSync('npx prisma migrate deploy');
  });

  afterEach(async () => {
    execSync('npx prisma migrate reset --force');
  });

  it('should update agency', async () => {
    const agency = new Agency({
      name: 'Agency 1',
      number: '001',
    });

    await agencyRepository.create(agency);

    const agencyResponse = await prisma.agency.findUnique({
      where: {
        id: agency.id,
      },
    });

    expect(agencyResponse.id).toEqual(agency.id);
    expect(agencyResponse.name).toEqual(agency.name);
    expect(agencyResponse.number).toEqual(agency.number);
  });

  it('should create agency', async () => {
    const agency = new Agency({
      name: 'Agency 1',
      number: '001',
    });

    await prisma.agency.create({
      data: {
        id: agency.id,
        name: agency.name,
        number: agency.number,
      },
    });

    const agencyUpdate = new Agency(
      {
        name: 'Agency 2',
        number: '001',
      },
      agency.id,
    );

    await agencyRepository.update(agencyUpdate);

    const agencyResponse = await prisma.agency.findUnique({
      where: {
        id: agency.id,
      },
    });

    expect(agencyResponse.id).toEqual(agencyUpdate.id);
    expect(agencyResponse.name).toEqual(agencyUpdate.name);
    expect(agencyResponse.number).toEqual(agencyUpdate.number);
  });

  it('should find agency by id', async () => {
    const agency = new Agency({
      name: 'Agency 1',
      number: '001',
    });

    await prisma.agency.create({
      data: {
        id: agency.id,
        name: agency.name,
        number: agency.number,
      },
    });

    const agencyResponse = await agencyRepository.findById(agency.id);

    expect(agencyResponse.id).toEqual(agency.id);
    expect(agencyResponse.name).toEqual(agency.name);
    expect(agencyResponse.number).toEqual(agency.number);
  });

  it('should find agency by number', async () => {
    const agency = new Agency({
      name: 'Agency 1',
      number: '001',
    });

    await prisma.agency.create({
      data: {
        id: agency.id,
        name: agency.name,
        number: agency.number,
      },
    });

    const agencyResponse = await agencyRepository.findByNumber(agency.number);

    expect(agencyResponse.id).toEqual(agency.id);
    expect(agencyResponse.name).toEqual(agency.name);
    expect(agencyResponse.number).toEqual(agency.number);
  });

  it('should findAll agencies', async () => {
    const agency = new Agency({
      name: 'Agency 1',
      number: '001',
    });

    const agency2 = new Agency({
      name: 'Agency 2',
      number: '002',
    });

    await prisma.agency.create({
      data: {
        id: agency.id,
        name: agency.name,
        number: agency.number,
      },
    });

    await prisma.agency.create({
      data: {
        id: agency2.id,
        name: agency2.name,
        number: agency2.number,
      },
    });

    const agenciesResponse = await agencyRepository.findAll();

    expect(agenciesResponse).toHaveLength(2);
  });
});
