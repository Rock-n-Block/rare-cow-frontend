import { toast } from 'react-toastify';

import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import { updateUserInfo } from 'store/user/actions';
import userSelector from 'store/user/selectors';
import { Modals } from 'types';

import { createCollection } from '../actions';
import actionTypes from '../actionTypes';

export function* createCollectionSaga({ type, payload }: ReturnType<typeof createCollection>) {
  yield put(
    setActiveModal({
      activeModal: Modals.SendPending,
      open: true,
      txHash: '',
    }),
  );
  yield put(apiActions.request(type));
  try {
    const { data } = yield call(baseApi.createNewCollection, payload);
    if (!data.initial_tx) {
      Object.values(data).forEach((err) => {
        toast.error(err);
      });

      yield put(
        setActiveModal({
          activeModal: Modals.none,
          open: false,
          txHash: '',
        }),
      );
      yield put(apiActions.error(type));
    } else {
      const address = yield select(userSelector.getProp('address'));
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { initial_tx, collection } = data;
      try {
        const { transactionHash } = yield call(payload.web3Provider.eth.sendTransaction, {
          ...initial_tx,
          from: address,
        });
        if (transactionHash) {
          payload.onSuccess?.();
          toast.success('Collection created successfully');

          yield put(
            setActiveModal({
              activeModal: Modals.SendSuccess,
              open: true,
              txHash: transactionHash,
            }),
          );
          yield put(apiActions.success(type));
        }
      } catch (err) {
        const id = yield select(userSelector.getProp('id'));
        yield call(baseApi.mintReject, {
          id: collection.url,
          type: 'collection',
          owner: id,
        });
        yield put(
          setActiveModal({
            activeModal: err.code === 4001 ? Modals.SendRejected : Modals.SendError,
            open: true,
            txHash: '',
          }),
        );
      }
    }
  } catch (err) {
    yield put(
      setActiveModal({
        activeModal: err.code === 4001 ? Modals.SendRejected : Modals.SendError,
        open: true,
        txHash: '',
      }),
    );
    toast.error('Something went wrong');
    payload.onError?.();
    yield put(apiActions.error(type, err));
  } finally {
    yield put(updateUserInfo({ web3Provider: payload.web3Provider }));
  }
  payload.onEnd?.();
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_COLLECTION, createCollectionSaga);
}
