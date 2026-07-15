import {
  abimethod,
  Account,
  Application,
  arc4,
  Asset,
  biguint,
  bytes,
  Contract,
  emit,
  FixedArray,
  gtxn,
  uint64,
} from '@algorandfoundation/algorand-typescript'

// Define a struct for the event with named parameters
class structAddressUint256 extends arc4.Struct<{
  address: arc4.Address
  uint256: arc4.Uint256
}> {}

// Define a struct for the event with named parameters
class innerStruct extends arc4.Struct<{
  num: arc4.Uint64
  struct: structAddressUint256
}> {}
export class AvmTypes extends Contract {
  @abimethod({ readonly: true })
  public stringReadonly(data: string): string {
    emit('stringReadonly', data)
    return data
  }
  public string(data: string): string {
    emit('string', data)
    return data
  }
  public stringArray(data: string[]): string[] {
    emit('stringArray', data)
    return data
  }
  public bytes(data: bytes): bytes {
    emit('bytes', data)
    return data
  }
  public boolean(data: boolean): boolean {
    emit('boolean', data)
    return data
  }
  public biguint(data: biguint): biguint {
    emit('biguint', data)
    return data
  }
  public struct(data: structAddressUint256): structAddressUint256 {
    emit('struct', data)
    return data
  }
  public innerStruct(data: innerStruct): innerStruct {
    emit('innerStruct', data)
    return data
  }
  public PaymentTxn(data: gtxn.PaymentTxn): bytes {
    emit('PaymentTxn', data.txnId)
    return data.txnId
  }
  public ApplicationCallTxn(data: gtxn.ApplicationCallTxn): bytes {
    emit('ApplicationCallTxn', data.txnId)
    return data.txnId
  }
  public AssetTransferTxn(data: gtxn.AssetTransferTxn): bytes {
    emit('AssetTransferTxn', data.txnId)
    return data.txnId
  }
  public KeyRegistrationTxn(data: gtxn.KeyRegistrationTxn): bytes {
    emit('KeyRegistrationTxn', data.txnId)
    return data.txnId
  }
  public Transaction(data: gtxn.Transaction): bytes {
    emit('Transaction', data.txnId)
    return data.txnId
  }
  public account(data: Account): Account {
    emit('account', data.bytes)
    return data
  }
  public asset(data: Asset): Asset {
    emit('asset', data.id)
    return data
  }
  public application(data: Application): Application {
    emit('application', data.id)
    return data
  }
  // Reference types encoded as a uint8 index into the transaction's accounts/assets/apps foreign array,
  // rather than passed by value (address / uint64 id) as the 'account'/'asset'/'application' methods above do.
  @abimethod({ resourceEncoding: 'index' })
  public accountIndexed(data: Account): Account {
    emit('accountIndexed', data.bytes)
    return data
  }
  @abimethod({ resourceEncoding: 'index' })
  public assetIndexed(data: Asset): Asset {
    emit('assetIndexed', data.id)
    return data
  }
  @abimethod({ resourceEncoding: 'index' })
  public applicationIndexed(data: Application): Application {
    emit('applicationIndexed', data.id)
    return data
  }
  // Array of struct is not compiling
  // public structArray(data: structAddressUint256[]): structAddressUint256[] {
  //   return data
  // }
  public arc4StaticBytes8(data: arc4.StaticBytes<8>): arc4.StaticBytes<8> {
    emit('arc4StaticBytes8', data)
    return data
  }
  public arc4StaticBytes32(data: arc4.StaticBytes<32>): arc4.StaticBytes<32> {
    emit('arc4StaticBytes32', data)
    return data
  }
  public arc4StaticBytes1020(data: arc4.StaticBytes<1020>): arc4.StaticBytes<1020> {
    // emit('arc4StaticBytes1020', data) // Error: program logs too large. 2048 bytes >  1024 bytes limit.
    return data
  }
  public arc4DynamicBytes(data: arc4.DynamicBytes): arc4.DynamicBytes {
    // emit('arc4DynamicBytes', data) // program logs too large. 1026 bytes >  1024 bytes limit.
    return data
  }
  public arc4Address(data: arc4.Address): arc4.Address {
    emit('arc4Address', data)
    return data
  }
  public arc4Bool(data: arc4.Bool): arc4.Bool {
    emit('arc4Bool', data)
    return data
  }
  public arc4Byte(data: arc4.Byte): arc4.Byte {
    emit('arc4Byte', data)
    return data
  }

  public arc4DynamicArrayOfStruct(
    data: arc4.DynamicArray<structAddressUint256>,
  ): arc4.DynamicArray<structAddressUint256> {
    emit('arc4DynamicArrayOfStruct', data)
    return data
  }
  public arc4StaticArrayOf2Bytes(data: arc4.StaticArray<arc4.Byte, 2>): arc4.StaticArray<arc4.Byte, 2> {
    emit('arc4StaticArrayOf2Bytes', data)
    return data
  }
  public arc4StaticArrayOf2Structs(
    data: arc4.StaticArray<structAddressUint256, 2>,
  ): arc4.StaticArray<structAddressUint256, 2> {
    emit('arc4StaticArrayOf2Structs', data)
    return data
  }
  public arc4UFixed8x16(data: arc4.UFixed<8, 16>): arc4.UFixed<8, 16> {
    emit('arc4UFixed8x16', data)
    return data
  }
  public arc4UFixed512x160(data: arc4.UFixed<512, 160>): arc4.UFixed<512, 160> {
    emit('arc4UFixed512x160', data)
    return data
  }
  public arc4UintN8(data: arc4.Uint<8>): arc4.Uint<8> {
    emit('arc4UintN8', data)
    return data
  }
  public arc4UintN512(data: arc4.Uint<512>): arc4.Uint<512> {
    emit('arc4UintN512', data)
    return data
  }
  public arc4UintN128Alias(data: arc4.Uint128): arc4.Uint128 {
    emit('arc4UintN128Alias', data)
    return data
  }
  public arc4UintN16Alias(data: arc4.Uint16): arc4.Uint16 {
    emit('arc4UintN16Alias', data)
    return data
  }
  public arc4UintN256Alias(data: arc4.Uint256): arc4.Uint256 {
    emit('arc4UintN256Alias', data)
    return data
  }
  public arc4UintN64Alias(data: arc4.Uint64): arc4.Uint64 {
    emit('arc4UintN64Alias', data)
    return data
  }
  public arc4UintN8Alias(data: arc4.Uint8): arc4.Uint8 {
    emit('arc4UintN8Alias', data)
    return data
  }
  public arc4UintN82Tuple(data: [arc4.Uint8, arc4.Uint8]): [arc4.Uint8, arc4.Uint8] {
    emit('arc4UintN82Tuple', ...data)
    return data
  }
  public arc4UintN83Tuple(data: [arc4.Uint8, arc4.Uint8, arc4.Uint8]): [arc4.Uint8, arc4.Uint8, arc4.Uint8] {
    emit('arc4UintN83Tuple', ...data)
    return data
  }
  public arc4ComplexTuple(
    data: [
      arc4.Address,
      [arc4.Uint256, arc4.Uint256],
      [arc4.Uint256, arc4.Uint256],
      [arc4.Uint256, arc4.Uint256],
    ],
  ): [arc4.Address, [arc4.Uint256, arc4.Uint256], [arc4.Uint256, arc4.Uint256], [arc4.Uint256, arc4.Uint256]] {
    emit('arc4ComplexTuple', ...data)
    return data
  }
  public uint64(data: uint64): uint64 {
    emit('uint64', data)
    return data
  }
  public uint64Array(data: uint64[]): uint64[] {
    emit('uint64Array', data)
    return data
  }
  public booleanArray(data: boolean[]): boolean[] {
    emit('booleanArray', data)
    return data
  }
  public arc4Str(data: arc4.Str): arc4.Str {
    emit('arc4Str', data)
    return data
  }
  public arc4Tuple(data: arc4.Tuple<[arc4.Uint64, arc4.Str]>): arc4.Tuple<[arc4.Uint64, arc4.Str]> {
    emit('arc4Tuple', data)
    return data
  }
  public nativeTuple(data: [uint64, string, boolean]): [uint64, string, boolean] {
    emit('nativeTuple', ...data)
    return data
  }
  public fixedArrayUint64(data: FixedArray<uint64, 3>): FixedArray<uint64, 3> {
    emit('fixedArrayUint64', data)
    return data
  }
}
