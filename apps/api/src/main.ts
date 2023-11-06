import express from 'express';

import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { Database } from '@dshit-count/api/database';

import process from 'process';

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
  const data = await db.insertInto('hit_count').values({
    pid: process.pid,
  }).returningAll().executeTakeFirstOrThrow();
  res.status(201).json({
    data
  });
})

/*
GET /api/v1/count/all
@method GET
*/
app.get('/api/v1/count/all', async (_, res) => {
  // Mengambil semua hit count dari database
  const data = await db.selectFrom('hit_count').selectAll().executeTakeAll();

  // Mengembalikan data hit count
  res.json({
    data,
  });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

process.on('SIGINT', function() {
  server.close(() => {
    console.log(`server is closed SIGINT http://localhost:${port}/api`);
  });
  db.destroy();
});

process.on('SIGTERM', function() {
  server.close(() => {
    console.log(`server is closed SIGTERM http://localhost:${port}/api`);
  });
  db.destroy();
});
