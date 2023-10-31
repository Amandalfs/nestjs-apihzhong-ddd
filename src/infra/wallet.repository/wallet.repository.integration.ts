import { PrismaService } from '../prisma-service/prisma.service';
import { execSync } from 'child_process';
import { WalletRepository } from './wallet.repository';
import { Wallet } from '@/wallet/domain/wallet/entities/wallet';

async function init() {
  const prisma = new PrismaService();
  await Promise.all([
    prisma.customer.create({
      data: {
        id: '1234',
        cpf: 'test',
        name: 'test',
        username: 'test',
        email: 'test',
        active: true,
      },
    }),
    prisma.agency.create({
      data: {
        id: '001',
        name: '001',
        number: '001',
      },
    }),
  ]);
}

describe('wallet repository intregation tests', () => {
  const prisma = new PrismaService();
  const walletRepository = new WalletRepository(prisma);

  beforeEach(async () => {
    execSync('npx prisma migrate deploy');
  });

  afterEach(async () => {
    execSync('npx prisma migrate reset --force');
  });

  it('should create wallet', async () => {
    await init();
    const wallet = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: '1234',
    });

    await walletRepository.create(wallet);

    const walletResponse = await prisma.wallet.findUnique({
      where: {
        id: wallet.id,
      },
    });

    expect(walletResponse.id).toEqual(wallet.id);
    expect(walletResponse.balance).toEqual(wallet.balance);
    expect(walletResponse.customerId).toEqual(wallet.customerId);
    expect(walletResponse.typeAccount).toEqual(wallet.typeAccount);
  });

  it('should update wallet', async () => {
    await init();
    const wallet = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: '1234',
    });

    await prisma.wallet.create({
      data: {
        id: wallet.id,
        customerId: wallet.customerId,

        agency: wallet.agency,
        agencyId: wallet.agencyId,

        balance: wallet.balance,
        typeAccount: wallet.typeAccount,

        limitSending: wallet.limitSending.limit,

        LimitSendingByDaily: wallet.limitSendingByDaily.limit,
        currentSendingByDaily: wallet.limitSendingByDaily.currentLimit.value,
        dateSendingByDaily: wallet.limitSendingByDaily.currentLimit.date,

        limitWithdraw: wallet.limitWithdraw.limit,

        LimitWithdrawByDaily: wallet.limitWithdrawByDaily.limit,
        currentWithdrawByDaily: wallet.limitWithdrawByDaily.currentLimit.value,
        dateWithdrawByDaily: wallet.limitWithdrawByDaily.currentLimit.date,

        keyCpf: wallet.keys.keyCpf,
        keyEmail: wallet.keys.keyEmail,
        keyRandom: wallet.keys.keyRandom,
      },
    });

    wallet.deposit(50);

    await walletRepository.update(wallet);

    const walletResponse = await prisma.wallet.findUnique({
      where: {
        id: wallet.id,
      },
    });

    expect(walletResponse.balance).toEqual(wallet.balance);
    expect(walletResponse.customerId).toEqual(wallet.customerId);
    expect(walletResponse.typeAccount).toEqual(wallet.typeAccount);
    expect(walletResponse.balance).toEqual(50);
  });

  it('should find wallet by id', async () => {
    await init();
    const wallet = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: '1234',
    });

    await prisma.wallet.create({
      data: {
        id: wallet.id,
        customerId: wallet.customerId,

        agency: wallet.agency,
        agencyId: wallet.agencyId,

        balance: wallet.balance,
        typeAccount: wallet.typeAccount,

        limitSending: wallet.limitSending.limit,

        LimitSendingByDaily: wallet.limitSendingByDaily.limit,
        currentSendingByDaily: wallet.limitSendingByDaily.currentLimit.value,
        dateSendingByDaily: wallet.limitSendingByDaily.currentLimit.date,

        limitWithdraw: wallet.limitWithdraw.limit,

        LimitWithdrawByDaily: wallet.limitWithdrawByDaily.limit,
        currentWithdrawByDaily: wallet.limitWithdrawByDaily.currentLimit.value,
        dateWithdrawByDaily: wallet.limitWithdrawByDaily.currentLimit.date,

        keyCpf: wallet.keys.keyCpf,
        keyEmail: wallet.keys.keyEmail,
        keyRandom: wallet.keys.keyRandom,
      },
    });

    const walletResponse = await walletRepository.findById(wallet.id);

    expect(walletResponse).toEqual(wallet);
  });
});
