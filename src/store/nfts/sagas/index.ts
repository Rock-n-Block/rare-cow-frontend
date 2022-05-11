/* eslint-disable import/no-named-as-default */
import { fork } from 'redux-saga/effects';

import bid from './bid';
import burnSaga from './burn';
import buy from './buy';
import createTokenSaga from './createToken';
import getCategoriesSaga from './getCategories';
import getDetailedNftSaga from './getDetailedNft';
import like from './like';
import presearchNftsSaga from './presearchNfts';
import search from './search';
import removeFromSale from './removeFromSale';
import searchNftsSaga from './searchNfts';
import searchTrendingSaga from './searchTrending';
import getLiked from './setLikedNFTs';
import setOnAuctionSaga from './setOnAuction';
import setOnSaleSaga from './setOnSale';
import transferSaga from './transfer';
import endAuctionSaga from './endAuction';
import feeInfo from './feeInfo';

export default function* nftSagas() {
  yield fork(getDetailedNftSaga);
  yield fork(presearchNftsSaga);
  yield fork(searchNftsSaga);
  yield fork(searchTrendingSaga);
  yield fork(buy);
  yield fork(bid);
  yield fork(getCategoriesSaga);
  yield fork(createTokenSaga);
  yield fork(removeFromSale);
  yield fork(like);
  yield fork(setOnSaleSaga);
  yield fork(setOnAuctionSaga);
  yield fork(transferSaga);
  yield fork(endAuctionSaga);
  yield fork(burnSaga);
  yield fork(getLiked);
  yield fork(search);
  yield fork(feeInfo);
}
