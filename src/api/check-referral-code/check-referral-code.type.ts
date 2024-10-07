import { IRequest, IResponse } from '../api.type';

export interface ICheckReferralCodeApiRequest extends IRequest {
  referral_code?: string;
}

export interface ICheckReferralCodeApiResponse extends IResponse {
  response: string | boolean;
}
