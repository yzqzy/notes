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

### Exclude

```typescript
type MyExclude<T, U> = T extends U ? never : T
```

* extends: When the type on the left of the extends is assignable to the one on the right, then you’ll get the type in the first branch (the “true” branch); otherwise you’ll get the type in the latter branch (the “false” branch).

### Includes

```typescript

```

### Awaited

```typescript
type MyAwaited<T> = T extends Promise<infer V> ? MyAwaited<V> : T
```

* infer：Conditional types provide us with a way to infer from types we compare against in the true branch using the infer keyword.

### If

```typescript
type If<C extends true | false, T, F> = C extends true ? T : F
```

### Concat

```typescript
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```

### Includes

```typescript

```