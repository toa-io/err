export class Err<
  Code extends string | number = string | number,
  Cause extends Exclude<any, string> = any
> implements Error {
  public readonly name = 'Error'
  public readonly code: Code
  public readonly message: string = ''
  public readonly cause: Cause | undefined

  public constructor (code: Code, message?: string)
  public constructor (code: Code, cause?: Cause)
  public constructor (code: Code, argument: string | Cause) {
    this.code = code

    Object.setPrototypeOf(this, Error.prototype)
    Object.defineProperty(this, 'name', { enumerable: false })

    if (typeof argument === 'string') {
      this.message = argument
      Object.defineProperty(this, 'cause', { enumerable: false })
    } else {
      Object.defineProperty(this, 'message', { enumerable: false })
      Object.defineProperty(this, 'cause', { enumerable: argument !== undefined, value: argument })
    }
  }
}
