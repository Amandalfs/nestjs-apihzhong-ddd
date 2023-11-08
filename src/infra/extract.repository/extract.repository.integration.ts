import { PrismaService } from '../prisma-service/prisma.service';
import { execSync } from 'child_process';
import { ExtractRepository } from './extract.repository';
import { Wallet } from './../../wallet/domain/wallet/entities/wallet';
import { Extract } from '@/wallet/domain/wallet/entities/extract.entity';

async function createCustomerAgencyAndWallet(): Promise<{ wallet: Wallet }> {
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
  const wallet = new Wallet(
    {
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: '1234',
    },
    'walletid',
  );

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
  return {
    wallet,
  };
}

describe('extracts repository intregation tests', () => {
  const prisma = new PrismaService();
  const extractRepository = new ExtractRepository(prisma);

  beforeEach(async () => {
    execSync('npx prisma migrate deploy');
  });

  afterEach(async () => {
    execSync('npx prisma migrate reset --force');
  });

  it('should create extract', async () => {
    const { wallet } = await createCustomerAgencyAndWallet();

    const extract = new Extract({
      type: 'saque',
      value: 50,
      wallet_id: wallet.id,
      description: 'test',
      created_at: new Date(2023, 1, 1, 1),
    });

    await extractRepository.create(extract);

    const response = await prisma.extract.findUnique({
      where: {
        id: extract.id,
      },
    });

    expect(response.id).toEqual(extract.id);
    expect(response.walletId).toEqual(extract.wallet_id);
    expect(response.description).toEqual(extract.description);
    expect(response.type).toEqual(extract.type);
    expect(response.value).toEqual(extract.value);
    expect(response.created_at).toEqual(extract.created_at);
  });

  it('should update extract', async () => {
    const { wallet } = await createCustomerAgencyAndWallet();

    const extract = new Extract({
      type: 'saque',
      value: 50,
      wallet_id: wallet.id,
      description: 'test',
      created_at: new Date(2023, 1, 1, 1),
    });

    await prisma.extract.create({
      data: {
        id: extract.id,
        walletId: extract.wallet_id,
        description: extract.description,
        type: extract.type,
        value: extract.value,
        created_at: extract.created_at,
      },
    });

    const extractUpdate = new Extract(
      {
        type: 'saque',
        value: 500,
        wallet_id: wallet.id,
        description: 'test',
        created_at: new Date(2024, 1, 1, 1),
      },
      extract.id,
    );

    await extractRepository.update(extractUpdate);

    const response = await prisma.extract.findUnique({
      where: {
        id: extract.id,
      },
    });

    expect(response.id).toEqual(extractUpdate.id);
    expect(response.walletId).toEqual(extractUpdate.wallet_id);
    expect(response.description).toEqual(extractUpdate.description);
    expect(response.type).toEqual(extractUpdate.type);
    expect(response.value).toEqual(extractUpdate.value);
    expect(response.created_at).toEqual(extractUpdate.created_at);
  });

  it('should find extract', async () => {
    const { wallet } = await createCustomerAgencyAndWallet();

    const extract = new Extract({
      type: 'saque',
      value: 50,
      wallet_id: wallet.id,
      description: 'test',
      created_at: new Date(2023, 1, 1, 1),
    });

    await prisma.extract.create({
      data: {
        id: extract.id,
        walletId: extract.wallet_id,
        description: extract.description,
        type: extract.type,
        value: extract.value,
        created_at: extract.created_at,
      },
    });

    const response = await extractRepository.findById(extract.id);
    expect(response.id).toEqual(extract.id);
    expect(response.wallet_id).toEqual(extract.wallet_id);
    expect(response.description).toEqual(extract.description);
    expect(response.type).toEqual(extract.type);
    expect(response.value).toEqual(extract.value);
    expect(response.created_at).toEqual(extract.created_at);
  });

  it('should findAll extract', async () => {
    const { wallet } = await createCustomerAgencyAndWallet();

    const extract = new Extract({
      type: 'saque',
      value: 50,
      wallet_id: wallet.id,
      description: 'test',
      created_at: new Date(2023, 1, 1, 1),
    });

    const extract2 = new Extract({
      type: 'saque',
      value: 500,
      wallet_id: wallet.id,
      description: 'test',
      created_at: new Date(2023, 1, 1, 2),
    });

    await prisma.extract.create({
      data: {
        id: extract.id,
        walletId: extract.wallet_id,
        description: extract.description,
        type: extract.type,
        value: extract.value,
        created_at: extract.created_at,
      },
    });

    await prisma.extract.create({
      data: {
        id: extract2.id,
        walletId: extract2.wallet_id,
        description: extract2.description,
        type: extract2.type,
        value: extract2.value,
        created_at: extract2.created_at,
      },
    });

    const responses = await extractRepository.findAll();
    expect(responses[0].id).toEqual(extract.id);
    expect(responses[0].wallet_id).toEqual(extract.wallet_id);
    expect(responses[0].description).toEqual(extract.description);
    expect(responses[0].type).toEqual(extract.type);
    expect(responses[0].value).toEqual(extract.value);
    expect(responses[0].created_at).toEqual(extract.created_at);

    expect(responses[1].id).toEqual(extract2.id);
    expect(responses[1].wallet_id).toEqual(extract2.wallet_id);
    expect(responses[1].description).toEqual(extract2.description);
    expect(responses[1].type).toEqual(extract2.type);
    expect(responses[1].value).toEqual(extract2.value);
    expect(responses[1].created_at).toEqual(extract2.created_at);
  });
});
