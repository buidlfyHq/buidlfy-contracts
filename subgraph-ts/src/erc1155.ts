import { Address, BigInt } from "@graphprotocol/graph-ts";

import { ERC1155Contract, ERC1155Token } from "../generated/schema";

import { IERC1155, URI as URIEvent } from "../generated/erc1155/IERC1155";

export function replaceURI(uri: string, identifier: BigInt): string {
  return uri.replaceAll(
    "{id}",
    identifier
      .toHex()
      .slice(2)
      .padStart(64, "0")
  );
}

export function fetchERC1155(address: Address): ERC1155Contract {
  let contract = ERC1155Contract.load(address);

  if (contract == null) {
    contract = new ERC1155Contract(address);
    contract.save();
  }

  return contract as ERC1155Contract;
}

export function fetchERC1155Token(
  contract: ERC1155Contract,
  identifier: BigInt
): ERC1155Token {
  let id = contract.id
    .toHex()
    .concat("/")
    .concat(identifier.toHex());
  let token = ERC1155Token.load(id);

  if (token == null) {
    let erc1155 = IERC1155.bind(Address.fromBytes(contract.id));
    let try_uri = erc1155.try_uri(identifier);
    token = new ERC1155Token(id);
    token.contract = contract.id;
    token.identifier = identifier;
    token.uri = try_uri.reverted ? null : replaceURI(try_uri.value, identifier);
    token.save();
  }

  return token as ERC1155Token;
}

export function handleURI(event: URIEvent): void {
  let contract = fetchERC1155(event.address);
  let token = fetchERC1155Token(contract, event.params.id);
  token.uri = replaceURI(event.params.value, event.params.id);
  token.save();
}
