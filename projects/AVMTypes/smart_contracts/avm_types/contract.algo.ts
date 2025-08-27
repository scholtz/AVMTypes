import { abimethod, arc4, biguint, bytes, Contract, gtxn } from '@algorandfoundation/algorand-typescript'

// Define a struct for the event with named parameters
class structAddressUint256 extends arc4.Struct<{
  address: arc4.Address
  uint256: arc4.UintN256
}> {}

// Define a struct for the event with named parameters
class innerStruct extends arc4.Struct<{
  num: arc4.UintN64
  struct: structAddressUint256
}> {}
export class AvmTypes extends Contract {
  @abimethod({ readonly: true })
  public stringReadonly(data: string): string {
    return data
  }
  public string(data: string): string {
    return data
  }
  public stringArray(data: string[]): string[] {
    return data
  }
  public bytes(data: bytes): bytes {
    return data
  }
  public boolean(data: boolean): boolean {
    return data
  }
  public biguint(data: biguint): biguint {
    return data
  }
  public struct(data: structAddressUint256): structAddressUint256 {
    return data
  }
  public innerStruct(data: innerStruct): innerStruct {
    return data
  }
  public PaymentTxn(data: gtxn.PaymentTxn): bytes {
    return data.txnId
  }
  public ApplicationCallTxn(data: gtxn.ApplicationCallTxn): bytes {
    return data.txnId
  }
  public AssetTransferTxn(data: gtxn.AssetTransferTxn): bytes {
    return data.txnId
  }
  public KeyRegistrationTxn(data: gtxn.KeyRegistrationTxn): bytes {
    return data.txnId
  }
  public Transaction(data: gtxn.Transaction): bytes {
    return data.txnId
  }
  // How to properly refence the asset ID?
  // public Asset(data: Asset): Asset {
  //   return data
  // }
  // public Application(data: Application): Application {
  //   return data
  // }
  // Array of struct is not compiling
  // public structArray(data: structAddressUint256[]): structAddressUint256[] {
  //   return data
  // }
  public arc4StaticBytes8(data: arc4.StaticBytes<8>): arc4.StaticBytes<8> {
    return data
  }
  public arc4StaticBytes32(data: arc4.StaticBytes<32>): arc4.StaticBytes<32> {
    return data
  }
  public arc4StaticBytes1020(data: arc4.StaticBytes<1020>): arc4.StaticBytes<1020> {
    return data
  }
  public arc4DynamicBytes(data: arc4.DynamicBytes): arc4.DynamicBytes {
    return data
  }
  public arc4Address(data: arc4.Address): arc4.Address {
    return data
  }
  public arc4Bool(data: arc4.Bool): arc4.Bool {
    return data
  }
  public arc4Byte(data: arc4.Byte): arc4.Byte {
    return data
  }

  public arc4DynamicArrayOfStruct(
    data: arc4.DynamicArray<structAddressUint256>,
  ): arc4.DynamicArray<structAddressUint256> {
    return data
  }
  public arc4StaticArrayOf2Bytes(data: arc4.StaticArray<arc4.Byte, 2>): arc4.StaticArray<arc4.Byte, 2> {
    return data
  }
  public arc4StaticArrayOf2Structs(
    data: arc4.StaticArray<structAddressUint256, 2>,
  ): arc4.StaticArray<structAddressUint256, 2> {
    return data
  }
  public arc4UFixed8x16(data: arc4.UFixedNxM<8, 16>): arc4.UFixedNxM<8, 16> {
    return data
  }
  public arc4UFixed512x160(data: arc4.UFixedNxM<512, 160>): arc4.UFixedNxM<512, 160> {
    return data
  }
  public arc4UintN8(data: arc4.UintN<8>): arc4.UintN<8> {
    return data
  }
  public arc4UintN512(data: arc4.UintN<512>): arc4.UintN<512> {
    return data
  }
  public arc4UintN128Alias(data: arc4.UintN128): arc4.UintN128 {
    return data
  }
  public arc4UintN16Alias(data: arc4.UintN16): arc4.UintN16 {
    return data
  }
  public arc4UintN256Alias(data: arc4.UintN256): arc4.UintN256 {
    return data
  }
  public arc4UintN64Alias(data: arc4.UintN64): arc4.UintN64 {
    return data
  }
  public arc4UintN8Alias(data: arc4.UintN8): arc4.UintN8 {
    return data
  }
  public arc4UintN82Tuple(data: [arc4.UintN8, arc4.UintN8]): [arc4.UintN8, arc4.UintN8] {
    return data
  }
  public arc4UintN83Tuple(data: [arc4.UintN8, arc4.UintN8, arc4.UintN8]): [arc4.UintN8, arc4.UintN8, arc4.UintN8] {
    return data
  }
  public arc4ComplexTuple(
    data: [
      arc4.Address,
      [arc4.UintN256, arc4.UintN256],
      [arc4.UintN256, arc4.UintN256],
      [arc4.UintN256, arc4.UintN256],
    ],
  ): [arc4.Address, [arc4.UintN256, arc4.UintN256], [arc4.UintN256, arc4.UintN256], [arc4.UintN256, arc4.UintN256]] {
    return data
  }
}
