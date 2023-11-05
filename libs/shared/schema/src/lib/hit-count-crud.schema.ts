import { Type } from '@sinclair/typebox';
import { DbSchema } from './database';
import { RecursiveStatic } from './generics';

export const HitCountCrudSchema = {
  path: '/count',
  create: {
    response: Type.Object({
      data: DbSchema['hit_count'],
    }),
  }
}

export type HitCountCrud = RecursiveStatic<typeof HitCountCrudSchema>;
