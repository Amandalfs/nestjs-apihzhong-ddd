import { Wallet } from '@/wallet/domain/wallet/entities/wallet';
import { WalletRepositoryInterface } from '@/wallet/domain/wallet/repositories/walletRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { Key } from '@/wallet/domain/wallet/entities/key.entity';
import { LimitSending } from '@/wallet/domain/wallet/value-objects/limitSending.value-object';
import { LimitSendingByDaily } from '@/wallet/domain/wallet/value-objects/limitSendingByDaily.object-value';
import { LimitWithdrawByDaily } from '@/wallet/domain/wallet/value-objects/limitWithdrawByDaily.object-value';

@Injectable()
export class WalletRepository implements WalletRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(entity: Wallet): Promise<void> {
    await this.prisma.wallet.create({
      data: {
        id: entity.id,
        agency: entity.agency,
        balance: entity.balance,
        typeAccount: entity.typeAccount,

        limitSending: entity.limitSending.limit,

        LimitSendingByDaily: entity.limitSendingByDaily.limit,
        currentSendingByDaily: entity.limitSendingByDaily.currentLimit.value,
        dateSendingByDaily: entity.limitSendingByDaily.currentLimit.date,

        limitWithdraw: entity.limitWithdraw.limit,

        LimitWithdrawByDaily: entity.limitWithdrawByDaily.limit,
        currentWithdrawByDaily: entity.limitWithdrawByDaily.currentLimit.value,
        dateWithdrawByDaily: entity.limitWithdrawByDaily.currentLimit.date,

        keyCpf: entity.keys.keyCpf,
        keyEmail: entity.keys.keyEmail,
        keyRandom: entity.keys.keyRandom,

        customer: {
          connect: {
            id: entity.customerId,
          },
        },

        agencyTo: {
          connect: {
            id: entity.agencyId,
          },
        },
      },
    });
  }

  async update(entity: Wallet): Promise<void> {
    await this.prisma.wallet.update({
      data: {
        customerId: entity.customerId,

        agency: entity.agency,
        agencyId: entity.agencyId,

        balance: entity.balance,
        typeAccount: entity.typeAccount,

        limitSending: entity.limitSending.limit,

        LimitSendingByDaily: entity.limitSendingByDaily.limit,
        currentSendingByDaily: entity.limitSendingByDaily.currentLimit.value,
        dateSendingByDaily: entity.limitSendingByDaily.currentLimit.date,

        limitWithdraw: entity.limitWithdraw.limit,

        LimitWithdrawByDaily: entity.limitWithdrawByDaily.limit,
        currentWithdrawByDaily: entity.limitWithdrawByDaily.currentLimit.value,
        dateWithdrawByDaily: entity.limitWithdrawByDaily.currentLimit.date,

        keyCpf: entity.keys.keyCpf,
        keyEmail: entity.keys.keyEmail,
        keyRandom: entity.keys.keyRandom,
      },
      where: {
        id: entity.id,
      },
    });
  }

  async findById(id: string): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({
      where: {
        id,
      },
    });

    return new Wallet(
      {
        customer_id: wallet.customerId,
        agency: wallet.agency,
        agency_id: wallet.agencyId,
        typeAccount: wallet.typeAccount,
        balance: wallet.balance,
        keys: new Key({
          keyCpf: wallet.keyCpf,
          keyEmail: wallet.keyEmail,
          keyRandom: wallet.keyRandom,
        }),
        limitSending: new LimitSending({ limit: wallet.limitSending }),
        limitSendingByDaily: new LimitSendingByDaily({
          currentLimit: {
            value: wallet.currentSendingByDaily,
            date: wallet.dateSendingByDaily,
          },
          limit: wallet.LimitSendingByDaily,
        }),
        limitWithdrawByDaily: new LimitWithdrawByDaily({
          currentLimit: {
            value: wallet.currentWithdrawByDaily,
            date: wallet.dateWithdrawByDaily,
          },
          limit: wallet.LimitWithdrawByDaily,
        }),
      },
      wallet.id,
    );
  }

  async findByKey(key: string): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findFirst({
      where: {
        OR: [
          {
            keyCpf: key,
          },
          {
            keyEmail: key,
          },
          {
            keyRandom: key,
          },
        ],
      },
    });

    return new Wallet(
      {
        customer_id: wallet.customerId,
        agency: wallet.agency,
        agency_id: wallet.agencyId,
        typeAccount: wallet.typeAccount,
        balance: wallet.balance,
        keys: new Key({
          keyCpf: wallet.keyCpf,
          keyEmail: wallet.keyEmail,
          keyRandom: wallet.keyRandom,
        }),
        limitSending: new LimitSending({ limit: wallet.limitSending }),
        limitSendingByDaily: new LimitSendingByDaily({
          currentLimit: {
            value: wallet.currentSendingByDaily,
            date: wallet.dateSendingByDaily,
          },
          limit: wallet.LimitSendingByDaily,
        }),
        limitWithdrawByDaily: new LimitWithdrawByDaily({
          currentLimit: {
            value: wallet.currentWithdrawByDaily,
            date: wallet.dateWithdrawByDaily,
          },
          limit: wallet.LimitWithdrawByDaily,
        }),
      },
      wallet.id,
    );
  }

  async findAll(): Promise<Wallet[]> {
    const wallets = await this.prisma.wallet.findMany();

    return wallets.map(
      (wallet) =>
        new Wallet(
          {
            customer_id: wallet.customerId,
            agency: wallet.agency,
            agency_id: wallet.agencyId,
            typeAccount: wallet.typeAccount,
            balance: wallet.balance,
            keys: new Key({
              keyCpf: wallet.keyCpf,
              keyEmail: wallet.keyEmail,
              keyRandom: wallet.keyRandom,
            }),
            limitSending: new LimitSending({ limit: wallet.limitSending }),
            limitSendingByDaily: new LimitSendingByDaily({
              currentLimit: {
                value: wallet.currentSendingByDaily,
                date: wallet.dateSendingByDaily,
              },
              limit: wallet.LimitSendingByDaily,
            }),
            limitWithdrawByDaily: new LimitWithdrawByDaily({
              currentLimit: {
                value: wallet.currentWithdrawByDaily,
                date: wallet.dateWithdrawByDaily,
              },
              limit: wallet.LimitWithdrawByDaily,
            }),
          },
          wallet.id,
        ),
    );
  }
}
