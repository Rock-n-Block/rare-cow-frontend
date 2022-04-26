/* eslint-disable max-len */
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { contractsConfig, ContractsNames } from 'config';
import { erc721Abi, erc1155Abi } from 'config/abi';
import { isMainnet } from 'config/constants';

import { Chains, Modals } from 'types';

import { approveNft } from '../actions';
import actionTypes from '../actionTypes';

export function* approveNftSaga({
  type,
  payload: { isSingle, web3Provider },
}: ReturnType<typeof approveNft>) {
  yield put(apiActions.request(type));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const myAddress = yield select(userSelector.getProp('address'));
  try {
    const nftAddress =
      contractsConfig.contracts[isSingle ? ContractsNames.erc721 : ContractsNames.erc1155][
        isMainnet ? 'mainnet' : 'testnet'
      ].address[Chains.bsc];
    const marketpalceAddress =
      contractsConfig.contracts[ContractsNames.marketpalce][isMainnet ? 'mainnet' : 'testnet']
        .address[Chains.bsc];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const nftContract = yield new web3Provider.eth.Contract(
      isSingle ? erc721Abi : erc1155Abi,
      nftAddress,
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isApproved = yield call(
      nftContract.methods.isApprovedForAll(myAddress, marketpalceAddress).call,
    );
    if (isApproved) {
      yield put(apiActions.success(type));
      return;
    }

    yield put(
      setActiveModal({
        activeModal: Modals.ApprovePending,
        open: true,
        txHash: '',
      }),
    );

    yield call(nftContract.methods.setApprovalForAll(marketpalceAddress, true).send, {
      from: myAddress,
    });

    yield put(apiActions.success(type));
  } catch (err: unknown) {
    // yield put(
    //   setActiveModal({
    //     activeModal: err.code === 4001 ? Modals.ApproveRejected : Modals.ApproveError,
    //     open: true,
    //     txHash: '',
    //   }),
    // );

    yield put(apiActions.error(type, err));
    throw err;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE_NFT, approveNftSaga);
}
