import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  TemplatedAccepted,
  TemplatedRemoved
} from "../generated/TemplateRegistry/TemplateRegistry"

export function createTemplatedAcceptedEvent(
  tokenId: BigInt,
  nftContractAddress: Address,
  acceptedTimestamp: BigInt
): TemplatedAccepted {
  let templatedAcceptedEvent = changetype<TemplatedAccepted>(newMockEvent())

  templatedAcceptedEvent.parameters = new Array()

  templatedAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  templatedAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContractAddress",
      ethereum.Value.fromAddress(nftContractAddress)
    )
  )
  templatedAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "acceptedTimestamp",
      ethereum.Value.fromUnsignedBigInt(acceptedTimestamp)
    )
  )

  return templatedAcceptedEvent
}

export function createTemplatedRemovedEvent(
  tokenId: BigInt,
  acceptedTimestamp: BigInt
): TemplatedRemoved {
  let templatedRemovedEvent = changetype<TemplatedRemoved>(newMockEvent())

  templatedRemovedEvent.parameters = new Array()

  templatedRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  templatedRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "acceptedTimestamp",
      ethereum.Value.fromUnsignedBigInt(acceptedTimestamp)
    )
  )

  return templatedRemovedEvent
}
