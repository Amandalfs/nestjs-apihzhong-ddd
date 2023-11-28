import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('CreateAgencyController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create agency', async () => {
    const response = await request(app.getHttpServer())
      .post('/api-rest/agency')
      .send({
        number: '001',
        name: 'Agency Zond',
      });
    expect(response.text).toEqual('created agency success');
  });
});
