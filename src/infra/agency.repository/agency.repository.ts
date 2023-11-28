import { Agency } from '@/wallet/domain/agency/entities/agency.entity';
import { AgencyRepositoryInterface } from '@/wallet/domain/agency/repositories/agency.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';

@Injectable()
export class AgencyRepository implements AgencyRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(entity: Agency): Promise<void> {
    await this.prisma.agency.create({
      data: {
        id: entity.id,
        name: entity.name,
        number: entity.number,
      },
    });
  }

  async update(entity: Agency): Promise<void> {
    await this.prisma.agency.update({
      data: {
        name: entity.name,
        number: entity.number,
      },
      where: {
        id: entity.id,
      },
    });
  }

  async findById(id: string): Promise<Agency> {
    const agency = await this.prisma.agency.findUnique({
      where: {
        id,
      },
    });

    return agency
      ? new Agency(
          {
            name: agency.name,
            number: agency.number,
          },
          agency.id,
        )
      : null;
  }

  async findByNumber(number: string): Promise<Agency> {
    const agency = await this.prisma.agency.findUnique({
      where: {
        number,
      },
    });

    return agency
      ? new Agency(
          {
            name: agency.name,
            number: agency.number,
          },
          agency.id,
        )
      : null;
  }

  async findAll(): Promise<Agency[]> {
    const agencies = await this.prisma.agency.findMany();
    return agencies
      ? agencies.map(
          (agency) =>
            new Agency(
              {
                name: agency.name,
                number: agency.number,
              },
              agency.id,
            ),
        )
      : null;
  }
}
