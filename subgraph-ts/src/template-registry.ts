import { BigInt, store } from "@graphprotocol/graph-ts";
import {
  TemplateRegistry,
  TemplatedAccepted,
  TemplatedRemoved,
} from "../generated/TemplateRegistry/TemplateRegistry";
import { ActiveTemplate, ERC1155Token, Listing } from "../generated/schema";

export function handleTemplatedAccepted(event: TemplatedAccepted): void {
  let template = new ActiveTemplate(
    event.params.nftContractAddress.toHexString() +
      "-" +
      event.params.tokenId.toString()
  );

  template.acceptedTimestamp = event.params.acceptedTimestamp.toString();
  template.isActive = true;

  let tokenId = event.params.nftContractAddress
    .toHex()
    .concat("/")
    .concat(event.params.tokenId.toHex());
  let erc1155Token = ERC1155Token.load(tokenId);

  if (erc1155Token) {
    template.token = erc1155Token.id;
  }

  template.save();

  let listing = Listing.load(
    event.params.nftContractAddress.toHexString() +
      "-" +
      event.params.tokenId.toString()
  );

  if (listing) {
    listing.isAccepted = true;
    listing.save();
  }
}

export function handleTemplatedRemoved(event: TemplatedRemoved): void {
  const id =
    event.params.nftContractAddress.toHexString() +
    "-" +
    event.params.tokenId.toString();
  let template = ActiveTemplate.load(id);

  if (template) {
    let tokenId = event.params.nftContractAddress
      .toHex()
      .concat("/")
      .concat(event.params.tokenId.toHex());
    let erc1155Token = ERC1155Token.load(tokenId);

    if (erc1155Token) {
      template.token = erc1155Token.id;
    }

    store.remove("ActiveTemplate", id);

    let listing = Listing.load(
      event.params.nftContractAddress.toHexString() +
        "-" +
        event.params.tokenId.toString()
    );

    if (listing) {
      listing.isAccepted = false;
      listing.save();
    }
  }
}
