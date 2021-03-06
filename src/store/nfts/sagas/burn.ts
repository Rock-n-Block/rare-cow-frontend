/* eslint-disable max-len */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { Modals } from 'types';

import { burn } from '../actions';
import actionTypes from '../actionTypes';
import { getDetailedNftSaga } from './getDetailedNft';

export function* burnSaga({
  type,
  payload: {
    id, amount, userId, web3Provider,
  },
}: ReturnType<typeof burn>) {
  yield put(apiActions.request(type));

  const userAddress: string = yield select(userSelector.getProp('address'));
  try {
    yield put(
      setActiveModal({
        activeModal: Modals.SendPending,
        open: true,
        txHash: '',
      }),
    );
    const { data } = yield call(baseApi.burn, { id, amount });

    if (data.initial_tx) {
      const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
        ...data.initial_tx,
        from: userAddress,
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

      yield call(baseApi.trackTransaction, {
        tx_hash: String(transactionHash),
        token: id,
        ownership: userId,
        amount: +amount,
      });

      yield put(apiActions.success(type));
    } else {
      yield put(apiActions.error(type));
      yield put(
        setActiveModal({
          activeModal: Modals.SendError,
          open: true,
          txHash: '',
        }),
      );
    }
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
    yield put(
      setActiveModal({
        activeModal: Modals.SendError,
        open: true,
        txHash: '',
      }),
    );
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.BURN, burnSaga);
}
