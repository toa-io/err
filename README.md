# Errors as values

Error constructor for Maybe Monads.

## Features

- `code` first, `message` optional
- instance of `Error`
- no stack trace
- serializable

## Examples

```typescript
import { Err } from 'error-value'
```

```typescript
const err = Err('BAD')

console.log(err instanceof Error) // true
console.log(err.code) // 'BAD'
console.log(err.message) // 'BAD'
```

```typescript
const err = Err('BAD', 'Something bad happened')

console.log(err.message) // 'Something bad happened'
```

```typescript
const err = Err('BAD', { foo: 'bar' })

console.log(err.foo) // 'bar'
console.log(JSON.stringify(err)) // '{"code":"BAD","foo":"bar"}'
```
