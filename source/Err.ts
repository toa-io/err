function Err<T> (code: string): ErrorValue<T>
function Err<T> (code: string, message: string): ErrorValue<T>
function Err<T> (code: string, properties: T): ErrorValue<T>
function Err<T> (code: string, properties?: string | Record<string, unknown>): ErrorValue<T> {
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

export type ErrorValue<T> = {
  code: string
  message?: string
} & T

export { Err }
