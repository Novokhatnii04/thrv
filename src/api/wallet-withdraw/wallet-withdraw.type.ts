import { IResponse } from '../api.type';

export interface IWalletWithdrawResponse extends IResponse {
  response: {
    sent: boolean;
  };
}
