import { Err } from './Err'

it('should be instance of Error', async () => {
  const err = Err('TEST')

  expect(err).toBeInstanceOf(Error)
})

it('should not create stack trace', async () => {
  const err = Err('TEST')

  expect('stack' in err).toBe(false)
})

it('should set code', async () => {
  const err = Err('TEST')

  expect(err.code).toBe('TEST')
})

it('should set code as message if no message is provided', async () => {
  const err = Err('TEST')

  expect(err.message).toBe('TEST')
})

it('should expose code as enumerable property', async () => {
  const err = Err('TEST')

  expect(Object.keys(err)).toContain('code')
})

it('should expose message', async () => {
  const err = Err('TEST', 'Something went wrong')

  expect(err.message).toBe('Something went wrong')
  expect(Object.keys(err)).toStrictEqual(['code', 'message'])
})

it('should expose specified properties', async () => {
  const err = Err('TEST', { foo: 'bar' })

  expect(err.foo).toBe('bar')
})

it('should be serializable', async () => {
  const err = Err('TEST', { foo: 'bar' })

  expect(JSON.parse(JSON.stringify(err))).toStrictEqual({
    code: 'TEST',
    message: 'TEST',
    foo: 'bar'
  })
})
