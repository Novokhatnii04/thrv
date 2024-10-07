import { IResponse } from '../api.type';

export interface ICouponNotUsedApiRequest extends IResponse {
  couponId?: number;
}

export interface ICouponNotUsedApiResponse extends IResponse {
  response: ICouponNotUsedResponse;
}

export type ICouponNotUsedResponse = string | boolean;
