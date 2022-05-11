import Web3 from 'web3';

import { User } from 'types/api/User';
import { Category } from 'types/api/Category';
import { ContractsNames } from 'config';
import { TCurrencies } from 'appConstants';
import { Chains } from 'types/connect';
import { Rewrite } from 'types';

export type BodyWithToken<T = never> = {
  token?: string;
} & T;

export type ApiResponse<T = never> = {
  data: BodyWithToken<T>;
  statusCode?: number;
  error?: string;
  message?: string | string[];
};

export type TrackTransactionReq = {
  tx_hash: string;
  token: number | string;
  ownership?: string | number;
  amount: number | string;
};

// STAKE REQUESTS
export type StakeReq = {
  web3Provider: Web3;
  amount: string;
  stakingContractAddress: string;
};

export type UnstakeReq = {
  web3Provider: Web3;
  stakingContractAddress: string;
};

export type GetStakesReq = {
  web3Provider: Web3;
};

export type ApproveReq = {
  web3Provider: Web3;
  spender: ContractsNames;
  amount: string;
  approveAddress: ContractsNames;
  currency: TCurrencies;
};

export type ApproveNftReq = {
  id: number | string;
  isSingle: boolean;
  web3Provider: Web3;
  currency: TCurrencies;
};

export type SetOnAuctionReq = {
  id: number | string;
  selling?: boolean;
  minimalBid: number | string;
  price?: number;
  currency?: string;
  startAuction?: number;
  start_auction?: number;
  end_auction?: number;
  endAuction?: number;
};

export type SetOnAuctionPreReq = {
  id: number | string;
  internalId: number | string;
  minimalBid: number | string;
  isSingle: boolean;
  currency?: TCurrencies;
  end_auction?: number;
  auctionDuration?: number;
  endAuction?: number;
  web3Provider: Web3;
};

export type SetOnSaleReq = {
  id: number | string;
  price: number | string;
  currency?: string;
  amount?: number | string;
};

export type SetOnSalePreReq = {
  id: number | string;
  internalId: number | string;
  price: number | string;
  isSingle: boolean;
  currency?: TCurrencies;
  amount?: number | string;
  web3Provider: Web3;
};

export type CreateNewPoolReq = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  poolData: any;
  web3Provider: Web3;
};

export type TResponseCategories = Category[];

export type GetTokenBalanceReq = {
  web3Provider: Web3;
  address: string;
  token: TCurrencies;
};

export type LoginReq = {
  address: string;
  web3Provider: Web3;
};

export type UpdateUserInfoReq = {
  web3Provider: Web3;
};

export type GetDetailedNftReq = {
  id: number | string;
};

export type GetSingleCollectionReq = {
  id: number | string;
  network: string;
};

export type GetTrendingNftsReq = {
  category: string | number;
};

export type BuyReq = {
  id: number | string;
  amount: number | string;
  tokenAmount?: string | number;
  sellerId?: number | string;
  web3Provider: Web3;
  currency: TCurrencies;
};

export type LikeReq = {
  id: number | string;
  successCallback?: () => void;
  errorCallback?: () => void;
};

export type EndAucReq = {
  id: number | string;
  web3Provider: Web3;
};

export type BidReq = {
  id: number | string;
  amount: number | string;
  currency: TCurrencies;
  web3Provider: Web3;
};

export type GetProfileInfoReq = {
  id: number | string;
  web3Provider: Web3;
};

export type SearchNftReq = {
  type: 'items' | 'collections' | 'users';
  page: number;
  on_timed_auc_sale?: boolean;
  on_auc_sale?: boolean;
  order_by?: string;
  items_per_page?: number;
  categories?: number | string;
  tags?: number;
  collections?: string;
  max_price?: string | number;
  min_price?: string | number;
  on_sale?: boolean;
  on_any_sale?: string | number;
  sold_by?: string | number;
  bids_by?: string | number;
  liked_by?: string | number;
  owner?: string | number;
  text?: string;
  standart?: string;
  creator?: string;
};

export type TransferTokenReq = {
  id: number | string;
  address: string;
  amount?: number | string;
  web3Provider: Web3;
};

export type BurnTokenReq = {
  id: number | string;
  amount?: string | number;
  web3Provider: Web3;
};

export type SearchCollectionsReq = {
  type: 'items' | 'collections' | 'users';
  page: number;
  owner?: string | number;
  creator?: string | number;
};

export type SearchTrendingsReq = {
  category?: string | number;
};

export type GetCategoriesReq = {
  name?: string;
};

export type SearchNftAction = {
  requestData: SearchNftReq;
  shouldConcat?: boolean;
};

export type SearchAction = {
  requestData: Partial<
  Rewrite<SearchNftReq, 'type', { type: 'items' | 'collections' | 'users' | 'categories' }>
  >;
  shouldConcat?: boolean;
};

export type RequestWithCallbacks = {
  onSuccess?: () => void;
  onError?: () => void;
  onEnd?: () => void;
};

export type CreateTokenRequest = {
  token: FormData;
  web3: Web3;
  listingInfo: {
    listNow: boolean;
    price: string;
    listType: number;
    timestamp: number;
    currency: TCurrencies,
  };
} & RequestWithCallbacks;

export type SearchCollectionAction = {
  requestData: SearchCollectionsReq;
  shouldConcat?: boolean;
};

export type RejectAction = {
  id: number | string;
  type: 'token' | 'collection';
  owner?: number | string;
};

export type GetProfileByIdRequest = {
  id: number | string;
  web3Provider: Web3;
};

export type EditProfile = Pick<
User,
'avatar' | 'bio' | 'displayName' | 'twitter' | 'facebook' | 'instagram' | 'site'
>;

export type RequestWithNetwork = {
  network: Chains;
};

export type RequestWithWeb3 = {
  web3Provider: Web3;
};

export type GetLikedNFTsRequest = {
  page: number | string;
  userId: number | string;
  shouldConcat?: boolean;
} & RequestWithNetwork;

export type CreateCollectionAction = {
  collection: FormData;
  web3Provider: Web3;
} & RequestWithNetwork &
RequestWithCallbacks;

export type SendTransactionAction = {
  web3Provider: Web3;
  data: object;
};
