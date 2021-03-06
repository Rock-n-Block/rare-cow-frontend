/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { Bid } from "./Bid";
import { CollectionSlim } from "./CollectionSlim";
import { UserSlim } from "./UserSlim";
import { Currency } from "./Currency";
import { Network } from "./Network";
import { Ownership } from "./Ownership";
import { Tag } from "./Tag";


export interface Token {
    animation?: string;
    available?: number;
    bids?: Bid[];
    collection: CollectionSlim;
    createdAt?: string;
    creator: UserSlim;
    currency: Currency;
    description?: string;
    digitalKey?: string;
    externalLink?: string;
    format?: string;
    hasDigitalKey: boolean;
    highestBid: Bid;
    id?: number;
    internalId?: number;
    isAucSelling: boolean;
    isLiked?: boolean;
    isSelling?: boolean;
    isTimedAucSelling: boolean;
    likeCount?: number;
    media?: string;
    name: string;
    network: Network;
    owners: Ownership[];
    price?: string;
    sellers?: Ownership[];
    standart?: string;
    tags: Tag[];
    totalSupply: number;
    usdPrice: number;
}