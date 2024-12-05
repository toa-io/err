export class Err<
  TCode extends string | number = string | number,
  TCause extends Exclude<any, string> = any
> extends Error {
  public readonly code: TCode
  public override readonly name = 'Error'
  public override readonly message: string = ''
  public override readonly cause: TCause | undefined

  public constructor (code: TCode, message?: string)
  public constructor (code: TCode, cause?: TCause)
  public constructor (code: TCode, argument: string | TCause) {
    super()
    this.code = code

    delete this.stack
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
