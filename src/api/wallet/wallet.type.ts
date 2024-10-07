import { IResponse } from '../api.type';

export interface IWalletTransaction {
  id: number;
  amount: number;
}

export interface IWalletResponse extends IResponse {
  response: {
    wallet?: {
      amount: number;
    };
    transactions: {
      [key in string]: IWalletTransaction[];
    }[];
    mode?: 'disabled' | 'enabled';
  };
}
