# TypeScript Challenges

## simple

### Pick

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

* keyof：The keyof operator takes an object type and produces a string or numeric literal union of its keys.
* P：custom key.

### ReadOnly

```typescript
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

### Tuple to Object

```typescript
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}
```

### First of Array

```typescript
// type First<T extends any[]> = T extends [] ? never : T[0]
// type First<T extends any[]> = T extends [infer First, ...infer _] ? First : never
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
```

### Length of Tuple

```typescript
type Length<T extends readonly any[]> = T['length']
```
