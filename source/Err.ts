function Err<T> (code: string): ErrorValue<T>
function Err<T> (code: string, message: string): ErrorValue<T>
function Err<T> (code: string, properties: T): ErrorValue<T>
function Err<T> (code: string, properties?: string | Record<string, unknown>): ErrorValue<T> {
  if (typeof properties === 'string')
    properties = { message: properties }

  const descriptor: PropertyDescriptorMap = {
    code: { value: code, enumerable: true },
    ...(properties === undefined ? undefined : map(properties))
  }

  return Object.create(Error.prototype, descriptor)
}

function map (properties: Record<string, unknown>): PropertyDescriptorMap {
  const descriptor: PropertyDescriptorMap = {}

  for (const key in properties)
    descriptor[key] = { value: properties[key], enumerable: true }

  return descriptor
}

export type ErrorValue<T> = {
  code: string
  message?: string
} & T

export { Err }
