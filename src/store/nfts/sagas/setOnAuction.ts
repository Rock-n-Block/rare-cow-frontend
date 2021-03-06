/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';

import { snakeize } from 'utils/camelize';

import { Modals } from 'types';
import { SetOnAuctionReq } from 'types/requests';

import { setOnAuction } from '../actions';
import actionTypes from '../actionTypes';
import { approveNftSaga } from './approveNft';
import { getDetailedNftSaga } from './getDetailedNft';

export function* setOnAuctionSaga({
  type,
  payload: {
    id,
    internalId,
    currency,
    isSingle,
    minimalBid,
    auctionDuration,
    web3Provider,
    collectionAddress,
  },
}: ReturnType<typeof setOnAuction>) {
  yield put(apiActions.request(type));
  let requestData: Partial<SetOnAuctionReq> = {};

  if (auctionDuration) {
    const dateNow = Math.floor(Date.now() / 1000);
    requestData = {
      minimalBid,
      currency: currency.name,
      startAuction: dateNow,
      endAuction: dateNow + auctionDuration,
    };
  }

  if (!auctionDuration) {
    requestData = {
      minimalBid,
      currency: currency.name,
    };
  }
  try {
    yield call(approveNftSaga, {
      type: actionTypes.APPROVE_NFT,
      payload: {
        id: internalId,
        isSingle,
        web3Provider,
        currency,
        collectionAddress,
      },
    });

    yield call(baseApi.setOnAuction, {
      id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...snakeize(requestData),
    });

    yield put(
      setActiveModal({
        activeModal: Modals.SendSuccess,
        open: true,
        txHash: '',
      }),
    );

    yield call(getDetailedNftSaga, {
      type: actionTypes.GET_DETAILED_NFT,
      payload: {
        id,
      },
    });

    yield put(apiActions.success(type));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(
      setActiveModal({
        activeModal: err.code === 4001 ? Modals.SendRejected : Modals.SendError,
        open: true,
        txHash: '',
      }),
    );
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SET_ON_AUCTION, setOnAuctionSaga);
}
