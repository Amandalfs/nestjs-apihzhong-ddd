import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should Create Customer by path POST (/customer)', async () => {
    await request(app.getHttpServer())
      .post('/api-rest/agency/create_admin')
      .send({
        email: 'amandaAgency@hzhong.com',
        password: '12345678',
      });

    const response = await request(app.getHttpServer())
      .post('/api-rest/agency/sessions')
      .send({
        email: 'amandabraba@hzhong.com',
        password: '12345678',
      });
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.token).toBe('string');
  });
});
