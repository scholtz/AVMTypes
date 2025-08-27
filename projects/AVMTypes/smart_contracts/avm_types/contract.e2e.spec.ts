import { Config } from '@algorandfoundation/algokit-utils'
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import algosdk, { Address } from 'algosdk'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { AvmTypesFactory } from '../artifacts/avm_types/AvmTypesClient'

describe('AvmTypes contract', () => {
  const localnet = algorandFixture()
  beforeAll(() => {
    Config.configure({
      debug: true,
      // traceAll: true,
    })
    registerDebugEventHandlers()
  })
  beforeEach(localnet.newScope)

  const deploy = async (account: Address) => {
    const factory = localnet.algorand.client.getTypedAppFactory(AvmTypesFactory, {
      defaultSender: account,
    })

    const { appClient } = await factory.deploy({
      onUpdate: 'append',
      onSchemaBreak: 'append',
    })
    return { client: appClient }
  }

  test('type bytes works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const values = [new Uint8Array(Buffer.from('Hello', 'ascii')), new Uint8Array(Buffer.from('World', 'ascii'))]
    for (let value of values) {
      const result = await client.send.bytes({ args: { data: value } })
      if (!result.return) throw Error('No return')
      expect(Buffer.from(result.return).toString('ascii')).toBe(Buffer.from(value).toString('ascii'))
    }
  })
  test('type boolean works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const values = [false, true]
    for (let value of values) {
      const result = await client.send.boolean({ args: { data: value } })
      expect(result.return).toBe(value)
    }
  })
  test('type string works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const values = ['Hello', 'World']
    for (let value of values) {
      const result = await client.send.string({ args: { data: value } })
      expect(result.return).toBe(value)
    }
  })
  test('type string[] works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const values = ['Hello', 'World']
    for (let value of values) {
      const result = await client.send.stringArray({ args: { data: [value] } })
      expect(JSON.stringify(result.return)).toBe(JSON.stringify([value]))
    }
  })
  test('type readonly string works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const values = ['Hello', 'World']
    for (let value of values) {
      const result = await client.send.stringReadonly({ args: { data: value } })
      expect(result.return).toBe(value)
    }
  })
  test('type arc4StaticBytes8 works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const values = [new Uint8Array(Buffer.from('12345678', 'ascii')), new Uint8Array(Buffer.from('87654321', 'ascii'))]
    for (let value of values) {
      const result = await client.send.arc4StaticBytes8({ args: { data: value } })
      if (!result.return) throw Error('No return')
      expect(Buffer.from(result.return).toString('ascii')).toBe(Buffer.from(value).toString('ascii'))
    }
  })
  test('type arc4StaticBytes32 works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const values = [
      new Uint8Array(Buffer.from('12345678901234567890123456789012', 'ascii')),
      new Uint8Array(Buffer.from('12345678901234567890123456789000', 'ascii')),
    ]
    for (let value of values) {
      const result = await client.send.arc4StaticBytes32({ args: { data: value } })
      if (!result.return) throw Error('No return')
      expect(Buffer.from(result.return).toString('ascii')).toBe(Buffer.from(value).toString('ascii'))
    }
  })
  test('type arc4StaticBytes1020 works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const testValue1 = new Uint8Array(1020)
    crypto.getRandomValues(testValue1)
    const testValue2 = new Uint8Array(1020)
    crypto.getRandomValues(testValue2)
    const testValue3 = new Uint8Array(1020)
    const values = [testValue1, testValue2, testValue3]
    for (let value of values) {
      const result = await client.send.arc4StaticBytes1020({ args: { data: value } })
      if (!result.return) throw Error('No return')
      expect(Buffer.from(result.return).toString('hex')).toBe(Buffer.from(value).toString('hex'))
    }
  })
  test('type arc4DynamicBytes works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const testValue1 = new Uint8Array(Math.round(Math.random() * 1000))
    crypto.getRandomValues(testValue1)
    const testValue2 = new Uint8Array(1018) // max the ret header (4 bytes) + the byte array length (2 bytes) + 1018  = max return value (1024)
    crypto.getRandomValues(testValue2)
    const testValue3 = new Uint8Array(0)
    const values = [testValue1, testValue2, testValue3]
    for (let value of values) {
      const result = await client.send.arc4DynamicBytes({ args: { data: value } })
      if (!result.return) throw Error('No return')
      expect(Buffer.from(result.return).toString('hex')).toBe(Buffer.from(value).toString('hex'))
    }
  })
  test('type arc4Address works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const testValue1 = new Uint8Array(32)
    crypto.getRandomValues(testValue1)
    const testValue2 = new Uint8Array(32)
    crypto.getRandomValues(testValue2)
    const testValue3 = new Uint8Array(32)
    const values = [
      algosdk.encodeAddress(testValue1),
      algosdk.encodeAddress(testValue2),
      algosdk.encodeAddress(testValue3),
    ]
    for (let value of values) {
      const result = await client.send.arc4Address({ args: { data: value } })
      if (!result.return) throw Error('No return')
      expect(result.return).toBe(value)
    }
  })
  test('type arc4Bool works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const values = [true, false]
    for (let value of values) {
      const result = await client.send.arc4Bool({ args: { data: value } })
      expect(result.return).toBe(value)
    }
  })
  test('type arc4Byte works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)

    const values = [0, 1, 255]
    for (let value of values) {
      const result = await client.send.arc4Byte({ args: { data: value } })
      expect(result.return).toBe(value)
    }
  })
  test('type struct works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)
    const values = [{ address: algosdk.encodeAddress(new Uint8Array(32)), uint256: 1n }]
    for (let value of values) {
      const result = await client.send.struct({ args: { data: value } })
      if (!result.return) throw Error('No return')
      expect(result.return.address).toBe(value.address)
      expect(result.return.uint256).toBe(value.uint256)
    }
  })
  test('type struct works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)
    const values = [{ address: algosdk.encodeAddress(new Uint8Array(32)), uint256: 1n }]
    for (let value of values) {
      const result = await client.send.struct({ args: { data: value } })
      if (!result.return) throw Error('No return')
      expect(result.return.address).toBe(value.address)
      expect(result.return.uint256).toBe(value.uint256)
    }
  })
  test('type innerStruct works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)
    const values = [{ num: 1n, struct: { address: algosdk.encodeAddress(new Uint8Array(32)), uint256: 1n } }]
    for (let value of values) {
      const result = await client.send.innerStruct({ args: { data: value } })
      if (!result.return) throw Error('No return')
      expect(result.return.num).toBe(value.num)
      expect(result.return.struct.address).toBe(value.struct.address)
      expect(result.return.struct.uint256).toBe(value.struct.uint256)
    }
  })
  // // arc4DynamicArrayOfStruct does not work as expected
  //
  // test('type arc4DynamicArrayOfStruct works', async () => {
  //   const { testAccount } = localnet.context
  //   const { client } = await deploy(testAccount)
  //   const values = [{ address: algosdk.encodeAddress(new Uint8Array(32)), uint256: 1n }]
  //   for (let value of values) {
  //     const result = await client.send.structArray({ args: { data: [value]} })
  //     if (!result.return) throw Error('No return')
  //     expect(result.return[0].address).toBe(value.address)
  //     expect(result.return[0].uint256).toBe(value.uint256)
  //   }
  // })
  // // arc4DynamicArrayOfStruct does not work as expected
  //
  // test('type arc4DynamicArrayOfStruct works', async () => {
  //   const { testAccount } = localnet.context
  //   const { client } = await deploy(testAccount)
  //   const values = [{ address: algosdk.encodeAddress(new Uint8Array(32)), uint256: 1n }]
  //   for (let value of values) {
  //     const result = await client.send.arc4DynamicArrayOfStruct({ args: { data: [value] } })
  //     if (!result.return) throw Error('No return')
  //     expect(result.return[0].address).toBe(value.address)
  //     expect(result.return[0].uint256).toBe(value.uint256)
  //   }
  // })
  // // why UFixed8x16 has input number and output bigint?
  // test('type arc4UFixed8x16 works', async () => {
  //   const { testAccount } = localnet.context
  //   const { client } = await deploy(testAccount)
  //   const values = [1, 11]
  //   for (let value of values) {
  //     const result = await client.send.arc4UFixed8x16({ args: { data: value } })
  //     if (!result.return) throw Error('No return')
  //     expect(Number(result.return)).toBe(value)
  //   }
  // })
  // why UFixed8x16 has input number and output bigint?
  test('type arc4UintN512 works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)
    const values = [
      0n,
      1n,
      13_407_807_929_942_597_099_574_024_998_205_846_127_479_365_820_592_393_377_723_561_443_721_764_030_073_546_976_801_874_298_166_903_427_690_031_858_186_486_050_853_753_882_811_946_569_946_433_649_006_084_095n,
    ]
    for (let value of values) {
      const result = await client.send.arc4UintN512({ args: { data: value } })
      expect(result.return).toBe(value)
    }
  })
  test('type arc4UintN256Alias works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)
    const values = [
      0n,
      1n,
      115_792_089_237_316_195_423_570_985_008_687_907_853_269_984_665_640_564_039_457_584_007_913_129_639_935n,
    ]
    for (let value of values) {
      const result = await client.send.arc4UintN256Alias({ args: { data: value } })
      expect(result.return).toBe(value)
    }
  })
  test('type arc4UintN64Alias works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)
    const values = [0n, 1n, 18_446_744_073_709_551_615n]
    for (let value of values) {
      const result = await client.send.arc4UintN64Alias({ args: { data: value } })
      expect(result.return).toBe(value)
    }
  })
  test('type arc4UintN8Alias works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)
    const values = [0, 1, 255]
    for (let value of values) {
      const result = await client.send.arc4UintN8Alias({ args: { data: value } })
      expect(result.return).toBe(value)
    }
  })
  test('type arc4UintN8 works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)
    const values = [0, 1, 255]
    for (let value of values) {
      const result = await client.send.arc4UintN8({ args: { data: value } })
      expect(result.return).toBe(value)
    }
  })
  test('type arc4UintN82Tuple works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)
    const values = [
      [0, 0],
      [1, 1],
      [255, 255],
    ] as [number | bigint, number | bigint][]
    for (let value of values) {
      const result = await client.send.arc4UintN82Tuple({ args: { data: value } })
      expect(result.return).toStrictEqual(value)
    }
  })
  test('type arc4UintN83Tuple works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)
    const values = [
      [0, 0, 0],
      [1, 1, 1],
      [255, 255, 255],
    ] as [number | bigint, number | bigint, number | bigint][]
    for (let value of values) {
      const result = await client.send.arc4UintN83Tuple({ args: { data: value } })
      expect(result.return).toStrictEqual(value)
    }
  })
  test('type arc4ComplexTuple works', async () => {
    const { testAccount } = localnet.context
    const { client } = await deploy(testAccount)
    const account = algosdk.generateAccount()
    const values = [[account.addr.toString(), [0n, 0n], [0n, 0n], [0n, 0n]]] as [
      string,
      [bigint | number, bigint | number],
      [bigint | number, bigint | number],
      [bigint | number, bigint | number],
    ][]
    for (let value of values) {
      const result = await client.send.arc4ComplexTuple({ args: { data: value } })
      expect(result.return).toStrictEqual(value)
    }
  })
})
