/* eslint-disable max-len */
import BigNumber from 'bignumber.js';
import { generateContract, ContractsNames } from 'config';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';

import { getFeeInfo } from '../actions';
import actionTypes from '../actionTypes';
import { setFees } from '../reducer';

export function* feeInfoSaga({
  type,
  payload: {
    web3Provider,
  },
}: ReturnType<typeof getFeeInfo>) {
  yield put(apiActions.request(type));

  try {
    const marketplaceContract = yield generateContract({
      web3Provider,
      contractName: ContractsNames.marketplace,
    });

    const feeDenominator = yield call(marketplaceContract.methods.PERCENT_DENOMINATOR().call);
    const feeAmount = yield call(marketplaceContract.methods.feePercentage().call);
    const feeReceiver = yield call(marketplaceContract.methods.feeReceiver().call);

    yield put(setFees({
      amount: new BigNumber(feeAmount).div(feeDenominator).toString(),
      receiver: feeReceiver,
    }));

    yield put(apiActions.success(type));
  } catch (err: unknown) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_FEE_INFO, feeInfoSaga);
}