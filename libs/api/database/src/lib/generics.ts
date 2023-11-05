import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

// ---------------------------------------------------------------------------
// Generics
// ---------------------------------------------------------------------------
export type Entity<T> = {
  table: T;
  select: Selectable<T>;
  insert: Insertable<T>;
  update: Updateable<T>;
};

export type Modify<T, R> = Omit<T, keyof R> & R;

export type DefaultAutoCols = {
  id: Generated<string>;
  created_at: ColumnType<number, number | undefined, never>;
  updated_at: ColumnType<number, number | undefined, number>;
};
