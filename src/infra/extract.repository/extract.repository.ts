import { Extract } from '@/wallet/domain/wallet/entities/extract.entity';
import { ExtractRepositoryInterface } from '@/wallet/domain/wallet/repositories/extractRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';

@Injectable()
export class ExtractRepository implements ExtractRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(entity: Extract): Promise<void> {
    await this.prisma.extract.create({
      data: {
        id: entity.id,
        walletId: entity.wallet_id,
        description: entity.description,
        type: entity.type,
        value: entity.value,
        created_at: entity.created_at,
      },
    });
  }

  async update(entity: Extract): Promise<void> {
    await this.prisma.extract.update({
      data: {
        walletId: entity.wallet_id,
        description: entity.description,
        type: entity.type,
        value: entity.value,
        created_at: entity.created_at,
      },
      where: {
        id: entity.id,
      },
    });
  }

  async findById(id: string): Promise<Extract> {
    const { created_at, description, type, value, walletId } =
      await this.prisma.extract.findUnique({
        where: {
          id,
        },
      });

    return new Extract(
      {
        created_at,
        description,
        type: type as 'saque' | 'deposito' | 'enviado' | 'recebido',
        value,
        wallet_id: walletId,
      },
      id,
    );
  }

  async findAll(): Promise<Extract[]> {
    const extracts = await this.prisma.extract.findMany();

    return extracts.map(
      ({ created_at, description, type, value, walletId, id }) =>
        new Extract(
          {
            created_at,
            description,
            type: type as 'saque' | 'deposito' | 'enviado' | 'recebido',
            value,
            wallet_id: walletId,
          },
          id,
        ),
    );
  }
}
