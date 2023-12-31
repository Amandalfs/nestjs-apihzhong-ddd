import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('CreateAdminSupportAgencyController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
