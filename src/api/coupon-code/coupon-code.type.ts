import { IResponse } from '../api.type';

export interface ICouponCodeApiRequest extends IResponse {
  couponId?: number;
}

export type ICouponCodeResponse = string;

export interface ICouponCodeApiResponse extends IResponse {
  response: string;
}
