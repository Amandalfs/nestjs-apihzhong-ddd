import { PrismaService } from '../prisma-service/prisma.service';
import { execSync } from 'child_process';
import { WalletRepository } from './wallet.repository';
import { Wallet } from '@/wallet/domain/wallet/entities/wallet';

async function createCustomerAndAgency() {
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

async function createCustomersAndAgency() {
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
    prisma.customer.create({
      data: {
        id: '1235',
        cpf: 'test2',
        name: 'test2',
        username: 'test2',
        email: 'test2',
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
    await createCustomerAndAgency();
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
    await createCustomerAndAgency();
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
    await createCustomerAndAgency();
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

  it('should find all wallets', async () => {
    await createCustomersAndAgency();
    const wallet = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: '1234',
    });

    const wallet2 = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: '1235',
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

    await prisma.wallet.create({
      data: {
        id: wallet2.id,
        customerId: wallet2.customerId,

        agency: wallet2.agency,
        agencyId: wallet2.agencyId,

        balance: wallet2.balance,
        typeAccount: wallet2.typeAccount,

        limitSending: wallet2.limitSending.limit,

        LimitSendingByDaily: wallet2.limitSendingByDaily.limit,
        currentSendingByDaily: wallet2.limitSendingByDaily.currentLimit.value,
        dateSendingByDaily: wallet2.limitSendingByDaily.currentLimit.date,

        limitWithdraw: wallet2.limitWithdraw.limit,

        LimitWithdrawByDaily: wallet2.limitWithdrawByDaily.limit,
        currentWithdrawByDaily: wallet2.limitWithdrawByDaily.currentLimit.value,
        dateWithdrawByDaily: wallet2.limitWithdrawByDaily.currentLimit.date,

        keyCpf: wallet2.keys.keyCpf,
        keyEmail: wallet2.keys.keyEmail,
        keyRandom: wallet2.keys.keyRandom,
      },
    });

    const walletResponse = await walletRepository.findAll();

    expect(walletResponse).toEqual([wallet, wallet2]);
  });
});
