import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PokemonController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/pokemon (POST)', () => {
    return request(app.getHttpServer())
      .post('/pokemon')
      .send({ name: 'Pikachu', dexNumber: 25 })
      .expect(201)
  });

  afterAll(async () => {
    await app.close();
  });
});
