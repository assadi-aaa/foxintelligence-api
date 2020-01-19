import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { LogModule } from '../src/log/log.module';
import * as responseApi from '../fixtures/response-analyse-api.json';
import * as assert from 'assert';
import { clearCache } from '../src/helpers';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('LogController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    await clearCache();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LogModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/log/analyse (GET)', () => {
    return request(app.getHttpServer())
      .get('/log/analyse')
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, responseApi);
      });
  });

  afterEach(async () => {
    await clearCache();
  });

});
