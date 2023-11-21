import express from 'express';

import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { Kysely, PostgresDialect, sql } from 'kysely';
import { Pool } from 'pg';

import { Database } from '@dshit-count/api/database';

import process from 'process';
import os from 'os';

import 'dotenv/config';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const dbConfig = {
  pool: new Pool({ connectionString: process.env.DATABASE_URL }),
};
const db = new Kysely<Database>({ dialect: new PostgresDialect(dbConfig) });

app.get('/health', (_, res) => {
  res.json({
    message: 'Distributed System Hit Point',
    time: new Date().getTime(),
  });
});

/**
 * POST /api/v1/count
 * @method POST
 * @returns HitCountCrud['create']['response'] libs/shared/schema/src/lib/hit-count-crud.schema.ts
 */
app.post('/api/v1/count', async (_, res) => {
  const data = await db
    .insertInto('hit_count')
    .values({
      pid: os.hostname(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();
  res.status(201).json({
    data,
  });
});

/**
 * GET /api/v1/count
 * @method GET
 * @param size {Number} the size of the data
 * @param page {Number} the page to list
 *
 * @returns HitCountCrud['read']['response'] libs/shared/schema/src/lib/hit-count-crud.schema.ts
 */
app.get('/api/v1/count', async (req, res) => {
  const { size, page } = req.query;

  const query = db.selectFrom('hit_count');

  const list = await query
    .selectAll()
    .offset((+page - 1) * +size)
    .limit(+size)
    .execute();
  const { count } = await query
    .select(sql<number>`count(*)`.as('count'))
    .executeTakeFirstOrThrow();

  res.json({
    data: {
      total_count: count,
      list,
    },
    pagination: {
      rows: count,
      pages: Math.ceil(count / +size),
    },
  });
});

const port = process.env.PORT || 8080;
const server = app.listen(+port, '0.0.0.0', () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

process.on('SIGINT', function () {
  server.close(() => {
    console.log(`server is closed SIGINT http://localhost:${port}/api`);
  });
  db.destroy();
});

process.on('SIGTERM', function () {
  server.close(() => {
    console.log(`server is closed SIGTERM http://localhost:${port}/api`);
  });
  db.destroy();
});
