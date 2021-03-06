/* eslint-disable max-len */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal, setModalProps } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { Modals } from 'types';

import { endAuction } from '../actions';
import actionTypes from '../actionTypes';
import { getDetailedNftSaga } from './getDetailedNft';

export function* endAuctionSaga({
  type,
  payload: { id, web3Provider },
}: ReturnType<typeof endAuction>) {
  yield put(apiActions.request(type));

  const address: string = yield select(userSelector.getProp('address'));
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = yield call(baseApi.verificateBet, { id });
    if (response.data.invalid_bet && Object.keys(response.data.invalid_bet).length) {
      yield call(getDetailedNftSaga, {
        type: actionTypes.GET_DETAILED_NFT,
        payload: {
          id,
        },
      });
    }

    yield put(
      setActiveModal({
        activeModal: Modals.SendPending,
        open: true,
        txHash: '',
      }),
    );

    const { data } = yield call(baseApi.endAuction, { id });

    const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
      ...data.initial_tx,
      from: address,
    });

    yield call(getDetailedNftSaga, {
      type: actionTypes.GET_DETAILED_NFT,
      payload: {
        id,
      },
    });

    yield put(
      setActiveModal({
        activeModal: Modals.SendSuccess,
        open: true,
        txHash: transactionHash,
      }),
    );

    yield put(apiActions.success(type));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield call(baseApi.buyReject, {
      id,
      type: 'token',
    });
    yield put(
      setModalProps({
        title: 'Invalid Bid',
        error: 'The buyer doesn`t have enough USDT. His bid was cancelled.',
      }),
    );
    yield put(
      setActiveModal({
        activeModal: Modals.Failed,
        open: false,
        txHash: '',
      }),
    );
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.END_AUCTION, endAuctionSaga);
}
