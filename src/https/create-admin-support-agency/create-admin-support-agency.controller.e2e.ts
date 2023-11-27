import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { execSync } from 'child_process';
import * as request from 'supertest';

describe('CreateAdminSupportAgencyController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    execSync('npx prisma migrate deploy');
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    execSync('npx prisma migrate reset --force');
  });

  it('should create user admin support agency', async () => {
    const response = await request(app.getHttpServer())
      .post('/api-rest/agency/create_admin')
      .send({
        email: 'amandaAgency@hzhong.com',
        password: '12345678',
      });
    expect(response.text).toEqual('created user support agency admin success');
  });
});
