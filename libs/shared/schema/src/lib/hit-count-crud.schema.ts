import { Type } from '@sinclair/typebox';
import { DbSchema } from './database';
import { RecursiveStatic } from './generics';

export const HitCountCrudSchema = {
  path: '/count',
  create: {
    response: Type.Object({
      data: DbSchema['hit_count'],
    }),
  },
  read: {
    query: Type.Object({
      size: Type.Number(),
      page: Type.Number(),
    }),
    response: Type.Object({
      data: Type.Object({
        total_count: Type.Number({ minimum: 0 }),
        list: Type.Array(DbSchema['hit_count']),
      }),
      pagination: Type.Object({
        rows: Type.Number(),
        pages: Type.Number(),
      }),
    }),
  },
};

export type HitCountCrud = RecursiveStatic<typeof HitCountCrudSchema>;
