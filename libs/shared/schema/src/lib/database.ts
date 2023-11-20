import { Type } from '@sinclair/typebox';

import { RecursiveStatic } from './generics';

export const HitCount = Type.Object({
  id: Type.String({ format: 'uuid' }),
  pid: Type.String(),
  created_at: Type.Integer({ minimum: 0 }),
  updated_at: Type.Integer({ minimum: 0 }),
});

export const DbSchema = {
  hit_count: HitCount,
};

export type Db = RecursiveStatic<typeof DbSchema>;
