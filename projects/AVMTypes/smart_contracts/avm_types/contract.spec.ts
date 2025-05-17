import { TestExecutionContext } from '@algorandfoundation/algorand-typescript-testing'
import { describe, expect, it } from 'vitest'
import { AvmTypes } from './contract.algo'

describe('AvmTypes contract', () => {
  const ctx = new TestExecutionContext()
  it('Logs the returned value when sayHello is called', () => {
    const contract = ctx.contract.create(AvmTypes)

    const result = contract.hello('Sally')

    expect(result).toBe('Hello, Sally')
  })
})
