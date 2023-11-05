import { promises as fs } from 'fs';
import {
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
  sql,
} from 'kysely';
import * as path from 'path';
import { Pool } from 'pg';

import 'dotenv/config';

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env['DATABASE_URL'] }),
  }),
});

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, 'migrations'),
  }),
});

export async function migrateToLatest() {
  await sql`select 1`.execute(db).catch((err) => console.error('error', err));
  const { error, results } = await migrator.migrateToLatest();

  if (results?.length !== 0) {
    results?.forEach((it) => {
      if (it.status === 'Success') {
        console.log(
          `migration "${it.migrationName}" was executed successfully`
        );
      } else if (it.status === 'Error') {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    });
  } else {
    console.log('nothing to migrate');
  }

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  console.log('Migration completed! Exiting...');
  await db.destroy();
}

export async function rollbackAll() {
  interface KyselyMigration {
    name: string;
    timestamp: string;
  }

  interface Database {
    kysely_migration: KyselyMigration;
  }

  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({ connectionString: process.env['DATABASE_URL'] }),
    }),
  });

  const migrations = await db
    .selectFrom('kysely_migration')
    .selectAll('kysely_migration')
    .execute();

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'migrations'),
    }),
  });

  for (let i = 0; i <= migrations.length; i++) {
    const { error, results } = await migrator.migrateDown();
    if (results?.length !== 0) {
      results?.forEach((it) => {
        if (it.status === 'Success') {
          console.log(
            `rollback "${it.migrationName}" was executed successfully`
          );
        } else if (it.status === 'Error') {
          console.error(`failed to execute rollback "${it.migrationName}"`);
        }
      });
    } else {
      console.log('nothing to rollback');
    }

    if (error) {
      console.error('failed to rollback');
      console.error(error);
      process.exit(1);
    }
  }

  console.log('Rollback completed! Exiting...');
  await db.destroy();
}

async function main() {
  const args = process.argv.splice(2);
  switch (args[0]) {
    case 'latest':
      migrateToLatest();
      break;
    case 'rollback':
      rollbackAll();
      break;
    default:
      console.log('Not yet implemented');
  }
}

main();
