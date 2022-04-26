import {
  call, CallEffect, put, PutEffect, select, SelectEffect,
} from 'redux-saga/effects';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { disconnectWalletState } from '../user/reducer';

import { validateStatus } from '../../utils/validateStatus';
import userSelector from '../user/selectors';

const client: AxiosInstance = axios.create({
  baseURL: 'https://phenom.rocknblock.io/api/v1/',
  validateStatus,
});

export default function* ajax<T = unknown>(
  config: AxiosRequestConfig,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
): Generator<SelectEffect | CallEffect<T> | PutEffect, AxiosResponse<ApiResponse<T>>> {
  const accessToken = yield select(userSelector.getProp('key'));

  if (accessToken) {
    client.defaults.headers.common.Authorization = `Token ${accessToken}`;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response: AxiosResponse<ApiResponse<T>> = yield call<(configVar: AxiosRequestConfig) => void
  >(client, config);

  if (accessToken && response.status === 401) {
    yield put(disconnectWalletState());
  }

  return response;
}
