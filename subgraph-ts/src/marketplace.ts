import { store } from "@graphprotocol/graph-ts";
import {
  AuctionBuffersUpdated as AuctionBuffersUpdatedEvent,
  AuctionClosed as AuctionClosedEvent,
  ListingAdded as ListingAddedEvent,
  ListingRemoved as ListingRemovedEvent,
  ListingUpdated as ListingUpdatedEvent,
  NewOffer as NewOfferEvent,
  NewSale as NewSaleEvent,
  PlatformFeeInfoUpdated as PlatformFeeInfoUpdatedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
} from "../generated/Contract/Contract";
import { ERC1155Token, Listing, NewSale } from "../generated/schema";

export function handleListingAdded(event: ListingAddedEvent): void {
  let entity = new Listing(
    event.params.assetContract.toHexString() +
      "-" +
      event.params.listing.tokenId.toString()
  );

  entity.lister = event.params.lister;
  entity.listing_listingId = event.params.listing.listingId;
  entity.listing_tokenOwner = event.params.listing.tokenOwner;
  entity.listing_assetContract = event.params.listing.assetContract;
  entity.listing_tokenId = event.params.listing.tokenId;
  entity.listing_startTime = event.params.listing.startTime;
  entity.listing_endTime = event.params.listing.endTime;
  entity.listing_quantity = event.params.listing.quantity;
  entity.listing_currency = event.params.listing.currency;
  entity.listing_reservePricePerToken =
    event.params.listing.reservePricePerToken;
  entity.listing_buyoutPricePerToken = event.params.listing.buyoutPricePerToken;
  entity.listing_tokenType = event.params.listing.tokenType;
  entity.listing_listingType = event.params.listing.listingType;
  entity.isAccepted = false;

  let tokenId = event.params.assetContract
    .toHex()
    .concat("/")
    .concat(event.params.listing.tokenId.toHex());
  let erc1155Token = ERC1155Token.load(tokenId);

  if (erc1155Token) {
    entity.token = erc1155Token.id;
  }

  entity.save();
}

export function handleListingRemoved(event: ListingRemovedEvent): void {
  store.remove(
    "Listing",
    event.params.listing.assetContract.toHexString() +
      "-" +
      event.params.listing.tokenId.toString()
  );
}

export function handleListingUpdated(event: ListingUpdatedEvent): void {
  let entity = new Listing(
    event.params.listing.assetContract.toHexString() +
      "-" +
      event.params.listing.tokenId.toString()
  );
  entity.listing_quantity = event.params.listing.quantity;
  entity.listing_reservePricePerToken =
    event.params.listing.reservePricePerToken;
  entity.listing_buyoutPricePerToken = event.params.listing.buyoutPricePerToken;
  entity.listing_currency = event.params.listing.currency;
  entity.listing_startTime = event.params.listing.startTime;
  entity.listing_endTime = event.params.listing.endTime;

  entity.save();
}

export function handleNewSale(event: NewSaleEvent): void {
  let sale = new NewSale(
    event.params.assetContract.toHexString() +
      "-" +
      event.params.tokenId.toString() +
      "-" +
      event.params.buyer.toHexString()
  );
  sale.listingId = event.params.listingId;
  sale.assetContract = event.params.assetContract;
  sale.lister = event.params.lister;
  sale.buyer = event.params.buyer;
  sale.quantityBought = event.params.quantityBought;
  sale.totalPricePaid = event.params.totalPricePaid;
  sale.save();
}
