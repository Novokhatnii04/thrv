import { IResponse } from '../api.type';

export interface IReferralStatusResponse extends IResponse {
  response: {
    mode: 'enabled' | 'disabled';
  };
}
