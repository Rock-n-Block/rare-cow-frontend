const GET_CATEGORIES = 'GET_CATEGORIES' as const;
const CREATE_TOKEN = 'CREATE_TOKEN' as const;
const SEARCH_NFTS = 'SEARCH_NFTS' as const;
const PRESEARCH_NFTS = 'PRESEARCH_NFTS' as const;
const GET_DETAILED_NFT = 'GET_DETAILED_NFT' as const;
const BUY = 'BUY' as const;
const APPROVE = 'APPROVE' as const;
const APPROVE_NFT = 'APPROVE_NFT' as const;
const SET_ON_AUCTION = 'SET_ON_AUCTION' as const;
const SET_ON_SALE = 'SET_ON_SALE' as const;
const BID = 'BID' as const;
const REMOVE_FROM_SALE = 'REMOVE_FROM_SALE' as const;
const LIKE = 'LIKE' as const;
const END_AUCTION = 'END_AUCTION' as const;
const TRACK_TRANSACTION = 'TRACK_TRANSACTION' as const;
const GET_TRENDING = 'GET_TRENDING' as const;
const TRANSFER = 'TRANSFER' as const;
const BURN = 'BURN' as const;
const GET_LIKED = 'GET_LIKED' as const;
const SEND_TRANSACTION = 'SEND_TRANSACTION' as const;
const SEARCH = 'SEARCH' as const;
const GET_FEE_INFO = 'GET_FEE_INFO' as const;
const GET_FEATURED = 'GET_FEATURED' as const;
const GET_PREMIUM = 'GET_PREMIUM' as const;

const nftActionTypes = {
  GET_CATEGORIES,
  CREATE_TOKEN,
  SEARCH_NFTS,
  PRESEARCH_NFTS,
  GET_DETAILED_NFT,
  BUY,
  APPROVE,
  APPROVE_NFT,
  SET_ON_AUCTION,
  SET_ON_SALE,
  BID,
  REMOVE_FROM_SALE,
  LIKE,
  END_AUCTION,
  TRACK_TRANSACTION,
  GET_TRENDING,
  TRANSFER,
  BURN,
  SEND_TRANSACTION,
  GET_LIKED,
  SEARCH,
  GET_FEE_INFO,
  GET_FEATURED,
  GET_PREMIUM,
};

export default nftActionTypes;
