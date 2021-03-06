import Web3 from 'web3';

import { User } from 'types/api/User';
import { Category } from 'types/api/Category';
import { ContractsNames } from 'config';
import { TCurrencies, TStandards } from 'appConstants';
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
  collectionAddress: string;
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
  collectionAddress: string;
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
  collectionAddress: string;
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

export type TActionSetter = 'user' | 'profile';

export type GetTokenBalanceReq = {
  web3Provider: Web3;
  address: string;
  token: TCurrencies;
  setter?: TActionSetter;
};

export type LoginReq = {
  address: string;
  web3Provider: Web3;
};

export type UpdateUserInfoReq = {
  web3Provider: Web3;
};

export type UpdateThemeReq = {
  isDark: boolean;
};

export type GetDetailedNftReq = {
  id: number | string;
};

export type RequestWithId = {
  id: number | string;
};

export type GetSingleCollectionReq = {
  id: number | string;
  network: Chains;
};

export type GetTrendingNftsReq = {
  tags: string | number;
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
  onInvalidBid?: (err: unknown) => void;
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
  on_any_sale?: boolean;
  sold_by?: string | number;
  bids_by?: string | number;
  liked_by?: string | number;
  owner?: string | number;
  text?: string;
  standart?: string;
  creator?: string;
  currency?: string;
  hide_premium?: boolean;
};

export type TransferTokenReq = {
  id: number | string;
  address: string;
  userId: string;
  amount?: number | string;
  web3Provider: Web3;
};

export type BurnTokenReq = {
  id: number | string;
  userId?: number | string;
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

export type GetPresearchNfts = {
  presearch: string;
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
  fee: number;
  listingInfo: {
    listNow: boolean;
    price: string;
    listType: string;
    timestamp: number;
    currency: TCurrencies,
    amount: string,
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

export type TEditableProfileField = Pick<
User,
'avatar' | 'bio' | 'displayName' | 'twitter' | 'facebook' | 'instagram' | 'site'
>;

export type EditProfile = {web3Provider: Web3, editData: TEditableProfileField};

export type RequestWithNetwork = {
  network: Chains;
};

export type RequestWithWeb3 = {
  web3Provider: Web3;
};

export type RequestFeeInfo = {
  standard?: TStandards,
  type?: 'buy' | 'create',
} & RequestWithWeb3;

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

export type BuyPromotion = {
  package: number;
  currency: TCurrencies;
  tokenId: number;
  web3Provider: Web3;
  priceInUsd: string;
};
