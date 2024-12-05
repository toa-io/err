import * as util from 'util'
import { Err } from './Err'

it('should be instance of Error', async () => {
  const err = new Err('TEST')

  expect(err).toBeInstanceOf(Error)
})

it('should not create stack trace', async () => {
  const err = new Err('TEST')

  expect('stack' in err).toBe(false)
})

it('should set code', async () => {
  const err = new Err('TEST')

  expect(err.code).toBe('TEST')
})

it('should expose code as enumerable property', async () => {
  const err = new Err('TEST')

  expect(Object.keys(err)).toContain('code')
})

it('should expose message', async () => {
  const err = new Err('TEST', 'Something went wrong')

  expect(err.message).toBe('Something went wrong')
  expect(Object.keys(err)).toStrictEqual(['code', 'message'])
})

it('should be inspected as Error', () => {
  const err = new Err('NOT_FOUND')
  const one = util.inspect(err)

  expect(one).toBe('Error { code: \'NOT_FOUND\' }')

  const msg = new Err('NOT_FOUND', 'Resource not found')
  const two = util.inspect(msg)

  expect(two).toBe('Error { code: \'NOT_FOUND\', message: \'Resource not found\' }')
})

it('should be compatible', async () => {
  function test (e: Error): Error {
    return e
  }

  const err = new Err('TEST', 'hello')

  console.log(err.code, err.message)
  console.log(err)

  // should not highlight error
  test(err)
})

it('should be serializable', () => {
  const code = new Err('TEST')
  const message = new Err('TEST', 'Something went wrong')

  expect(JSON.stringify(code)).toBe('{"code":"TEST"}')
  expect(JSON.stringify(message)).toBe('{"code":"TEST","message":"Something went wrong"}')
})

it('should set cause', () => {
  const err = new Err(500, { foo: 'bar' })

  expect(err.code).toBe(500)
  expect(err.cause).toStrictEqual({ foo: 'bar' })
  expect(err.message).toStrictEqual('')
  expect(JSON.stringify(err)).toBe('{"code":500,"cause":{"foo":"bar"}}')
})
