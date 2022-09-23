import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ExampleEntity } from "../generated/schema"
import { TemplatedAccepted } from "../generated/TemplateRegistry/TemplateRegistry"
import { handleTemplatedAccepted } from "../src/template-registry"
import { createTemplatedAcceptedEvent } from "./template-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let tokenId = BigInt.fromI32(234)
    let nftContractAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let acceptedTimestamp = BigInt.fromI32(234)
    let newTemplatedAcceptedEvent = createTemplatedAcceptedEvent(
      tokenId,
      nftContractAddress,
      acceptedTimestamp
    )
    handleTemplatedAccepted(newTemplatedAcceptedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExampleEntity created and stored", () => {
    assert.entityCount("ExampleEntity", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "nftContractAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "acceptedTimestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
