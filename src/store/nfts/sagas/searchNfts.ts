import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import nftSelector from 'store/nfts/selectors';

import { camelize } from 'utils/camelize';

import { TokenFull } from 'types/api/TokenFull';
import { setNfts, setTotalPages } from '../reducer';

import { searchNfts } from '../actions';
import actionTypes from '../actionTypes';

export function* searchNftsSaga({
  type,
  payload: { requestData, shouldConcat },
}: ReturnType<typeof searchNfts>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.searchNfts, requestData);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const nfts = yield select(nftSelector.getProp('nfts'));

    const camelizedResult = camelize(data.results) as TokenFull[];

    yield put(setNfts(shouldConcat ? [...nfts, ...camelizedResult] : camelizedResult));
    yield put(setTotalPages(data.total_pages));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SEARCH_NFTS, searchNftsSaga);
}
