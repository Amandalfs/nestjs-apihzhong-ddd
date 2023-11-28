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
    const response = await request(app.getHttpServer())
      .post('/api-rest/customers')
      .send({
        username: 'amandalfs',
        email: 'amandabraba@hzhong.com',
        password: '12345678',
        name: 'amanda',
        cpf: '123.456.789-11',
      });
    expect(response.statusCode).toEqual(201);
    expect(response.text).toEqual('customer created success');
  });
});
