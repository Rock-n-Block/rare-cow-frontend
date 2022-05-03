import { Collection } from 'types/api/Collection';
import { Chains, IChainType } from 'types/connect';

export type UserState = {
  id: number | null;
  avatar: string;
  address: string;
  balance: string | number;
  key: string;
  provider: string;
  chain: Chains;
  displayName: string;
  collections: Collection[];
  isWhitelisted: boolean,
  rate: string,
  chainType: IChainType
};

export type LoginReq = {
  address: string;
  msg: string;
  signed_msg: string;
};
