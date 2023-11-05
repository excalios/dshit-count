import { Static, TSchema } from '@sinclair/typebox';

export type RecursiveStatic<Schemas> = {
  [Key in keyof Schemas]: Schemas[Key] extends TSchema
    ? ExpandDeep<Static<Schemas[Key]>>
    : RecursiveStatic<Schemas[Key]>;
};

// Problem: https://github.com/microsoft/vscode/issues/94679
// Source: https://github.com/shian15810/type-expand
type ExpandDeep<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandDeep<O[K]> }
    : never
  : T;
