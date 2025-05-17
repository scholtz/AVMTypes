import { Contract } from '@algorandfoundation/algorand-typescript'

export class AvmTypes extends Contract {
  public hello(name: string): string {
    return `Hello, ${name}`
  }
}
