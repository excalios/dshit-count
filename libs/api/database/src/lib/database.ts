import { Db } from '@dshit-count/shared/schema';
import { DefaultAutoCols, Entity, Modify } from './generics';

export interface Database {
  hit_count: HitCountTable;
}

type HitCountTable = Modify<Db['hit_count'], DefaultAutoCols>;
export type HitCount = Entity<HitCountTable>
