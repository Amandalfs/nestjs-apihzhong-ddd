import { Injectable } from '@nestjs/common';
import { AuthUser } from '@/auth-user/domain/entities/authUser.entity';
import { AuthUserRepositoryInterface } from '@/auth-user/domain/repositories/authUserRepositoryInterface';
import { PrismaService } from '../prisma-service/prisma.service';

type Rules = 'member' | 'adminCustomer' | 'adminSuport' | 'adminWallet';

@Injectable()
export class AuthUserRepository implements AuthUserRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(entity: AuthUser): Promise<void> {
    await this.prisma.authUser.create({
      data: {
        email: entity.email,
        id: entity.id,
        password: entity.password,
        rules: entity.rule as Rules,
      },
    });
  }

  async update(entity: AuthUser): Promise<void> {
    await this.prisma.authUser.update({
      data: {
        email: entity.email,
        password: entity.password,
        rules: entity.rule as Rules,
      },
      where: {
        id: entity.id,
      },
    });
  }

  async findById(id: string): Promise<AuthUser> {
    const user = await this.prisma.authUser.findFirst({
      where: {
        id,
      },
    });
    const authUser = new AuthUser(
      {
        email: user.email,
        password: user.password,
        customerId: '',
        rule: user.rules,
        hash: false,
      },
      user.id,
    );
    return authUser;
  }

  async findAll(): Promise<AuthUser[]> {
    const users = await this.prisma.authUser.findMany();
    const authUsers = users.map(
      (user) =>
        new AuthUser(
          {
            email: user.email,
            password: user.password,
            customerId: '',
            rule: user.rules,
            hash: false,
          },
          user.id,
        ),
    );
    return authUsers;
  }

  async findByEmail(email: string): Promise<AuthUser> {
    const user = await this.prisma.authUser.findFirst({
      where: {
        email,
      },
    });

    const authUser = new AuthUser(
      {
        email: user.email,
        password: user.password,
        customerId: '',
        rule: user.rules,
        hash: false,
      },
      user.id,
    );

    return authUser;
  }
}
