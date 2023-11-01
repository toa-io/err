function Err<T> (code: string): ErrorType<T>
function Err<T> (code: string, message: string): ErrorType<T>
function Err<T> (code: string, properties: T): ErrorType<T>
function Err<T> (code: string, properties?: string | Record<string, unknown>): ErrorType<T> {
  if (typeof properties === 'string')
    properties = { message: properties }

  const descriptor: PropertyDescriptorMap = {
    code: property(code),
    ...(properties === undefined ? undefined : map(properties))
  }

  if (descriptor.message === undefined)
    descriptor.message = property(code)

  return Object.create(Error.prototype, descriptor)
}

function map (properties: Record<string, unknown>): PropertyDescriptorMap {
  const descriptor: PropertyDescriptorMap = {}

  for (const key in properties)
    descriptor[key] = property(properties[key])

  return descriptor
}

function property (value: any): PropertyDescriptor {
  return { value, enumerable: true }
}

export type ErrorType<T> = Error & { code: string } & T

export { Err }
