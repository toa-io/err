export class Err implements Error {
  public readonly name = 'Error'
  public readonly code: string
  public readonly message: string = ''

  public constructor (code: string | number, message?: string) {
    this.code = code.toString()
    this.message = message ?? ''

    Object.setPrototypeOf(this, Error.prototype)
    Object.defineProperty(this, 'name', { enumerable: false })

    if (message === undefined)
      Object.defineProperty(this, 'message', { enumerable: false })
    else
      this.message = message
  }
}
