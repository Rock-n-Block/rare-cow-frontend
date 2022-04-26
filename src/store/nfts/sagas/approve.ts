/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { erc20Abi } from 'config/abi';

import { Modals } from 'types';

import BigNumber from 'bignumber.js';
import { approve } from '../actions';
import actionTypes from '../actionTypes';

export function* approveSaga({
  type,
  payload: {
    amount, spender, tokenAddress, web3Provider,
  },
}: ReturnType<typeof approve>) {
  yield put(apiActions.request(type));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const myAddress = yield select(userSelector.getProp('address'));

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const tokenContract = yield new web3Provider.eth.Contract(erc20Abi, tokenAddress);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const allowance = yield call(tokenContract.methods.allowance(myAddress, spender).call);

    if (+allowance < +amount) {
      yield put(
        setActiveModal({
          activeModal: Modals.ApprovePending,
          open: true,
          txHash: '',
        }),
      );
      try {
        yield call(
          tokenContract.methods.approve(
            spender,
            new BigNumber(amount).plus(new BigNumber(allowance)).toString(),
          ).send,
          {
            from: myAddress,
          },
        );
        yield put(apiActions.success(type));
      } catch (e: unknown) {
        yield put(apiActions.error(type, e));
        throw e;
      }
    }
  } catch (err: unknown) {
    // allowance error
    yield put(apiActions.error(type, err));
    throw err;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE, approveSaga);
}
