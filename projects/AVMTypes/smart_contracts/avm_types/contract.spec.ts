import { Bytes, arc4 } from '@algorandfoundation/algorand-typescript'
import { TestExecutionContext } from '@algorandfoundation/algorand-typescript-testing'
import { describe, expect, it } from 'vitest'
import { AvmTypes } from './contract.algo'

describe('AvmTypes contract', () => {
  const ctx = new TestExecutionContext()
  it('type string works', () => {
    const contract = ctx.contract.create(AvmTypes)

    const values = ['Hello', 'World']
    values.forEach((testValue) => {
      const result = contract.string(testValue)
      expect(result).toBe(testValue)
    })
  })
  it('type readonly string works', () => {
    const contract = ctx.contract.create(AvmTypes)

    const values = ['Hello', 'World']
    values.forEach((testValue) => {
      const result = contract.stringReadonly(testValue)
      expect(result).toBe(testValue)
    })
  })
  it('type bytes works', () => {
    const contract = ctx.contract.create(AvmTypes)

    const values = ['Hello', 'World']
    values.forEach((testValue) => {
      const result = contract.bytes(Bytes(testValue))
      expect(result.toString()).toBe(testValue.toString())
    })
  })
  it('type boolean works', () => {
    const contract = ctx.contract.create(AvmTypes)

    const values = [true, false]
    values.forEach((testValue) => {
      const result = contract.boolean(testValue)
      expect(result).toBe(testValue)
    })
  })
  it('type arc4StaticBytes8 works', () => {
    const contract = ctx.contract.create(AvmTypes)

    const values = ['12345678', '87654321']
    values.forEach((testValue) => {
      var data = new arc4.StaticBytes<8>(testValue)
      const result = contract.arc4StaticBytes8(data)
      expect(result.bytes.toString()).toBe(data.bytes.toString())
    })
  })
  it('type arc4StaticBytes32 works', () => {
    const contract = ctx.contract.create(AvmTypes)

    const values = ['12345678901234567890123456789012', '12345678901234567890123456789000']
    values.forEach((testValue) => {
      var data = new arc4.StaticBytes<32>(testValue)
      const result = contract.arc4StaticBytes32(data)
      expect(result.bytes.toString()).toBe(data.bytes.toString())
    })
  })
  it('type arc4StaticBytes1020 works', () => {
    // this test works up to 4092 bytes limit
    // the avm args limit is 2048 bytes
    // the avm logs limit is 1024 bytes
    const contract = ctx.contract.create(AvmTypes)

    const testValue1 = new Uint8Array(1020)
    crypto.getRandomValues(testValue1)
    const values = [testValue1]
    values.forEach((testValue) => {
      var bytes = Bytes(testValue)
      var data = new arc4.StaticBytes<1020>(bytes)
      const result = contract.arc4StaticBytes1020(data)

      expect(result.bytes.toString()).toBe(data.bytes.toString())
    })
  })
  it('type arc4DynamicBytes works', () => {
    const contract = ctx.contract.create(AvmTypes)

    const testValue1 = new Uint8Array(Math.round(Math.random() * 1000))
    crypto.getRandomValues(testValue1)
    const testValue2 = new Uint8Array(1018) // max the ret header (4 bytes) + the byte array length (2 bytes) + 1018  = max return value (1024)
    crypto.getRandomValues(testValue2)
    const testValue3 = new Uint8Array(0)
    const values = [testValue1, testValue2, testValue3]
    values.forEach((testValue) => {
      var bytes = Bytes(testValue)
      var data = new arc4.DynamicBytes(bytes)
      const result = contract.arc4DynamicBytes(data)

      expect(result.bytes.toString()).toBe(data.bytes.toString())
    })
  })
  it('type arc4Address works', () => {
    const contract = ctx.contract.create(AvmTypes)

    const testValue1 = new Uint8Array(32) // max the ret header (4 bytes) + the byte array length (2 bytes) + 1018  = max return value (1024)
    crypto.getRandomValues(testValue1)
    const testValue2 = new Uint8Array(32)
    const values = [new arc4.Address(Bytes(testValue1)), new arc4.Address(Bytes(testValue2))]
    values.forEach((testValue) => {
      const result = contract.arc4Address(testValue)

      expect(result.bytes.toString()).toBe(testValue.bytes.toString())
    })
  })
})
