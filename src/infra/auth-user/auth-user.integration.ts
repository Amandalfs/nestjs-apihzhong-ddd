import { PrismaService } from '../prisma-service/prisma.service';
import { AuthUser } from '@/auth-user/domain/entities/authUser.entity';
import { AuthUserRepository } from './prisma.auth-user.repository';
import { execSync } from 'child_process';

type Rules = 'member' | 'adminCustomer' | 'adminSuport' | 'adminWallet';

describe('auth user repository intregation tests', () => {
  const prisma = new PrismaService();
  const authUserRepository = new AuthUserRepository(prisma);

  beforeEach(async () => {
    execSync('npx prisma migrate deploy');
  });

  afterEach(async () => {
    execSync('npx prisma migrate reset --force');
  });

  it('should create auth user by to auth user', async () => {
    const authUser = new AuthUser({
      email: 'email@email.com',
      password: '12345678',
      rule: 'member',
      hash: true,
    });

    await authUserRepository.create(authUser);
    const user = await prisma.authUser.findFirst({
      where: {
        id: authUser.id,
      },
    });
    expect(user.email).toEqual(authUser.email);
    expect(user.id).toEqual(authUser.id);
    expect(user.password).toEqual(authUser.password);
    expect(user.rules).toEqual(authUser.rule);
  });

  it('should update user auth', async () => {
    const authUser = new AuthUser({
      email: 'email@email.com',
      password: '12345678',
      rule: 'member' as Rules,
      hash: true,
    });

    await prisma.authUser.create({
      data: {
        id: authUser.id,
        email: authUser.email,
        password: authUser.password,
        rules: authUser.rule as Rules,
      },
    });

    const authUserUpdate = new AuthUser(
      {
        email: 'email2@email.com',
        password: '12345678915',
        rule: 'member' as Rules,
        hash: true,
      },
      authUser.id,
    );

    await authUserRepository.update(authUserUpdate);

    const user = await prisma.authUser.findFirst({
      where: {
        id: authUserUpdate.id,
      },
    });

    expect(user.email).toEqual(authUserUpdate.email);
    expect(user.id).toEqual(authUserUpdate.id);
    expect(user.password).toEqual(authUserUpdate.password);
    expect(user.rules).toEqual(authUserUpdate.rule);
  });

  it('should find auth user with id', async () => {
    const authUser = new AuthUser({
      email: 'email@email.com',
      password: '12345678',
      rule: 'member' as Rules,
      hash: true,
    });

    await prisma.authUser.create({
      data: {
        id: authUser.id,
        email: authUser.email,
        password: authUser.password,
        rules: authUser.rule as Rules,
      },
    });

    const user = await authUserRepository.findById(authUser.id);

    expect(user.email).toEqual(authUser.email);
    expect(user.id).toEqual(authUser.id);
    expect(user.password).toEqual(authUser.password);
    expect(user.rule).toEqual(authUser.rule);
  });

  it('should find auth user with email', async () => {
    const authUser = new AuthUser({
      email: 'email@email.com',
      password: '12345678',
      rule: 'member' as Rules,
      hash: true,
    });

    await prisma.authUser.create({
      data: {
        id: authUser.id,
        email: authUser.email,
        password: authUser.password,
        rules: authUser.rule as Rules,
      },
    });

    const user = await authUserRepository.findByEmail(authUser.email);

    expect(user.email).toEqual(authUser.email);
    expect(user.id).toEqual(authUser.id);
    expect(user.password).toEqual(authUser.password);
    expect(user.rule).toEqual(authUser.rule);
  });

  it('should find all auth user', async () => {
    const authUsers = [
      new AuthUser({
        email: 'email@email.com',
        password: '12345678',
        rule: 'member' as Rules,
        hash: true,
      }),
      new AuthUser({
        email: 'email2@email.com',
        password: '12345678',
        rule: 'member' as Rules,
        hash: true,
      }),
    ];

    await prisma.authUser.create({
      data: {
        id: authUsers[0].id,
        email: authUsers[0].email,
        password: authUsers[0].password,
        rules: authUsers[0].rule as Rules,
      },
    });
    await prisma.authUser.create({
      data: {
        id: authUsers[1].id,
        email: authUsers[1].email,
        password: authUsers[1].password,
        rules: authUsers[1].rule as Rules,
      },
    });

    const users = await authUserRepository.findAll();

    expect(users).toHaveLength(2);
    expect(users[0].email).toEqual(authUsers[0].email);
    expect(users[0].id).toEqual(authUsers[0].id);
    expect(users[0].password).toEqual(authUsers[0].password);
    expect(users[0].rule).toEqual(authUsers[0].rule);
  });
});
